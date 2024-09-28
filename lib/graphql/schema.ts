import * as fsp from 'node:fs/promises';
import * as path from 'node:path';

import { projectRoot } from '@app/lib/config.ts';
import type { Context } from '@app/lib/graphql/context.ts';
import { convertCharacter } from '@app/lib/graphql/resolvers/character.ts';
import { convertPerson } from '@app/lib/graphql/resolvers/person.ts';
import {
  convertSubject,
  convertTopic,
  subjectResolver,
} from '@app/lib/graphql/resolvers/subject.ts';
import * as entity from '@app/lib/orm/entity/index.ts';
import {
  CastRepo,
  CharacterRepo,
  CharacterSubjectsRepo,
  fetchUser,
  PersonRepo,
  PersonSubjectsRepo,
  SubjectRelationRepo,
  SubjectTopicRepo,
} from '@app/lib/orm/index.ts';
import { avatar } from '@app/lib/response.ts';
import { ListTopicDisplays } from '@app/lib/topic/index.ts';

import type * as types from './__generated__/resolvers.ts';

export function convertUser(user: entity.User) {
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    avatar: avatar(user.avatar),
  };
}

export const resolvers = {
  Query: {
    async me(_parent, _args, { auth }: Context) {
      if (!auth.userID) {
        return null;
      }

      const user = await fetchUser(auth.userID);
      if (!user) {
        return null;
      }

      return {
        id: user.id,
        avatar: avatar(user.img),
        nickname: user.nickname,
        username: user.username,
      };
    },

    subject: subjectResolver,

    async person(_parent, { id }: { id: number }, { auth: { allowNsfw } }: Context) {
      let query = PersonRepo.createQueryBuilder('c').where('c.id = ?', [id]);
      if (!allowNsfw) {
        query = query.andWhere('c.nsfw = ?', [allowNsfw]);
      }
      query = query.andWhere('c.ban = 0');
      const person = await query.getSingleResult();
      if (!person) {
        return null;
      }
      return convertPerson(person);
    },

    async character(_parent, { id }: { id: number }, { auth: { allowNsfw } }: Context) {
      let query = CharacterRepo.createQueryBuilder('c').where('c.id = ?', [id]);
      if (!allowNsfw) {
        query = query.andWhere('c.nsfw = ?', [allowNsfw]);
      }
      query = query.andWhere('c.ban = 0');
      const character = await query.getSingleResult();
      if (!character) {
        return null;
      }
      return convertCharacter(character);
    },
  },

  Subject: {
    tags(parent: types.Subject, { limit }): types.SubjectTag[] {
      if (limit && limit > 0) {
        return parent.tags.slice(0, limit);
      }

      return parent.tags;
    },

    async episodes(
      parent: { id: number },
      { limit, offset, type },
      { repo }: Context,
    ): Promise<types.Episode[]> {
      if (!parent.id) {
        return [];
      }

      if (offset < 0) {
        const count = await repo.Episode.createQueryBuilder('t')
          .where('t.subjectID = ?', [parent.id])
          .getCount();

        offset = count + offset;
      }

      let s = repo.Episode.createQueryBuilder('t')
        .select('*')
        .where('t.subjectID = ?', [parent.id]);
      if (type) {
        s = s.andWhere('t.type = ?', [type]);
      }
      const episodes = await s.orderBy({ 't.sort': 'ASC' }).limit(limit).offset(offset).execute();

      return episodes.map((e: entity.Episode) => {
        return {
          id: e.id,
          type: e.type,
          name: e.name,
          name_cn: e.nameCN,
          description: e.summary,
          airdate: e.airDate,
          comment: e.epComment,
          last_post: e.epLastPost,
          disc: e.epDisc,
          duration: e.duration,
          sort: e.sort,
        };
      });
    },

    async topics(
      parent: { id: number },
      { limit, offset }: { limit: number; offset: number },
      { auth: u }: Context,
    ) {
      let query = SubjectTopicRepo.createQueryBuilder('t')
        .innerJoin('t.creator', 'u', { 'u.id': 't.creatorID' })
        .where('t.parentID = ?', [parent.id]);
      const displays = ListTopicDisplays(u);
      if (displays.length > 0) {
        query = query.andWhere('t.display IN (?)', [displays]);
      }
      const topics = await query
        .orderBy({ 't.createdAt': 'DESC' })
        .offset(offset)
        .limit(limit)
        .execute();
      return topics.map((t) => {
        return convertTopic(t);
      });
    },

    async persons(
      parent: { id: number },
      { limit, offset }: { limit: number; offset: number },
      { auth: { allowNsfw } }: Context,
    ) {
      let query = PersonSubjectsRepo.createQueryBuilder('r')
        .innerJoin('r.person', 'p', { 'p.id': 'r.personID' })
        .where('r.subjectID = ?', [parent.id]);
      if (!allowNsfw) {
        query = query.andWhere('p.nsfw = ?', [allowNsfw]);
      }
      const relations = await query
        .orderBy({ 'r.position': 'ASC' })
        .offset(offset)
        .limit(limit)
        .execute();
      return relations.map((r) => {
        return {
          person: convertPerson(r.person),
          position: r.position,
        };
      });
    },

    async characters(
      parent: { id: number },
      { limit, offset }: { limit: number; offset: number },
      { auth: { allowNsfw } }: Context,
    ) {
      let query = CharacterSubjectsRepo.createQueryBuilder('r')
        .innerJoin('r.character', 'c', { 'c.id': 'r.characterID' })
        .where('r.subjectID = ?', [parent.id]);
      if (!allowNsfw) {
        query = query.andWhere('c.nsfw = ?', [allowNsfw]);
      }
      const relations = await query
        .orderBy({ 'r.type': 'ASC' })
        .orderBy({ 'r.order': 'ASC' })
        .offset(offset)
        .limit(limit)
        .execute();
      return relations.map((r) => {
        return {
          character: convertCharacter(r.character),
          type: r.type,
          order: r.order,
        };
      });
    },

    async relations(
      parent: { id: number },
      { limit, offset, includeTypes, excludeTypes },
      { auth: { allowNsfw } }: Context,
    ): Promise<types.SubjectRelation[]> {
      let query = SubjectRelationRepo.createQueryBuilder('r')
        .innerJoin('r.relatedSubject', 's', { 's.id': 'r.relatedSubjectID' })
        .innerJoin('s.fields', 'f', { 'f.subjectID': 's.id' })
        .where('r.subjectID = ?', [parent.id]);
      if (includeTypes && includeTypes.length > 0) {
        query = query.andWhere('r.relationType IN (?)', [includeTypes]);
      }
      if (excludeTypes && excludeTypes.length > 0) {
        query = query.andWhere('r.relationType NOT IN (?)', [excludeTypes]);
      }
      if (!allowNsfw) {
        query = query.andWhere('s.subjectNsfw = ?', [allowNsfw]);
      }
      const relations = await query
        .orderBy({ 'r.relationType': 'ASC' })
        .orderBy({ 'r.order': 'ASC' })
        .orderBy({ 'r.relatedSubjectID': 'ASC' })
        .offset(offset)
        .limit(limit)
        .execute();
      return relations.map((r: entity.SubjectRelation) => {
        return {
          subject: convertSubject(r.relatedSubject),
          relation: r.relationType,
          order: r.order,
        };
      });
    },
  },
  Character: {
    async subjects(
      parent: { id: number },
      { limit, offset }: { limit: number; offset: number },
      { auth: { allowNsfw } }: Context,
    ) {
      let query = CharacterSubjectsRepo.createQueryBuilder('r')
        .innerJoin('r.subject', 's', { 's.id': 'r.subjectID' })
        .innerJoin('s.fields', 'f', { 'f.subjectID': 's.id' })
        .where('r.characterID = ?', [parent.id]);
      if (!allowNsfw) {
        query = query.andWhere('s.subjectNsfw = ?', [allowNsfw]);
      }
      const relations = await query
        .orderBy({ 'r.type': 'ASC' })
        .orderBy({ 'r.order': 'ASC' })
        .offset(offset)
        .limit(limit)
        .execute();
      return relations.map((r) => ({
        subject: convertSubject(r.subject),
        type: r.type,
        order: r.order,
      }));
    },
    async persons(
      parent: { id: number },
      { limit, offset }: { limit: number; offset: number },
      { auth: { allowNsfw } }: Context,
    ) {
      const query = CastRepo.createQueryBuilder('r')
        .innerJoin('r.person', 'p', { 'p.id': 'r.personID' })
        .innerJoin('r.subject', 's', { 's.id': 'r.subjectID' })
        .innerJoin('s.fields', 'f', { 'f.subjectID': 's.id' })
        .where('r.characterID = ?', [parent.id]);
      if (!allowNsfw) {
        query.andWhere('s.subjectNsfw = ?', [allowNsfw]);
      }
      const relations = await query.offset(offset).limit(limit).execute();
      return relations.map((r) => ({
        person: convertPerson(r.person),
        subject: convertSubject(r.subject),
        summary: r.summary,
      }));
    },
  },
  Person: {
    async characters(
      parent: { id: number },
      { limit, offset }: { limit: number; offset: number },
      { auth: { allowNsfw } }: Context,
    ) {
      const query = CastRepo.createQueryBuilder('r')
        .innerJoin('r.character', 'c', { 'c.id': 'r.characterID' })
        .innerJoin('r.subject', 's', { 's.id': 'r.subjectID' })
        .innerJoin('s.fields', 'f', { 'f.subjectID': 's.id' })
        .where('r.personID = ?', [parent.id]);
      if (!allowNsfw) {
        query.andWhere('s.subjectNsfw = ?', [allowNsfw]);
      }
      const relations = await query.offset(offset).limit(limit).execute();
      return relations.map((r) => ({
        character: convertCharacter(r.character),
        subject: convertSubject(r.subject),
        summary: r.summary,
      }));
    },

    async subjects(
      parent: { id: number },
      { limit, offset }: { limit: number; offset: number },
      { auth: { allowNsfw } }: Context,
    ) {
      let query = PersonSubjectsRepo.createQueryBuilder('r')
        .innerJoin('r.subject', 's', { 's.id': 'r.subjectID' })
        .innerJoin('s.fields', 'f', { 'f.subjectID': 's.id' })
        .where('r.personID = ?', [parent.id]);
      if (!allowNsfw) {
        query = query.andWhere('s.subjectNsfw = ?', [allowNsfw]);
      }
      const relations = await query
        .orderBy({ 'r.position': 'ASC' })
        .offset(offset)
        .limit(limit)
        .execute();
      return relations.map((r) => ({
        subject: convertSubject(r.subject),
        position: r.position,
      }));
    },
  },
} satisfies types.Resolvers;

export const schema = await fsp.readFile(
  path.join(projectRoot, 'lib', 'graphql', 'schema.graphql'),
  'utf8',
);
