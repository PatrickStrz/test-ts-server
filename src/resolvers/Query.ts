import { getUserId, Context } from '../utils'
import { buildInfo } from 'graphql-binding'
const { forwardTo } = require('prisma-binding')

export const Query = {
    feed(parent, args, ctx: Context, info) {
        return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },

    drafts(parent, args, ctx: Context, info) {
        const id = getUserId(ctx)

        const where = {
            isPublished: false,
            author: {
                id,
            },
        }

        return ctx.db.query.posts({ where }, info)
    },

    post(parent, { id }, ctx: Context, info) {
        return ctx.db.query.post({ where: { id: id } }, info)
    },

    /* 
    Regular way to expose query from prisma db server:

    posts(parent, args, ctx: Context, info) {
        return ctx.db.query.posts({}, info)
    },
    */

    /* using resolver forwarding to map a query directly from prisma ( still need to import query type into schema.graphql):
     https://github.com/graphcool/prisma/tree/master/examples/resolver-forwarding
    */
    posts: forwardTo('db'),

    me(parent, args, ctx: Context, info) {
        const id = getUserId(ctx)
        return ctx.db.query.user({ where: { id } }, info)
    },
}
