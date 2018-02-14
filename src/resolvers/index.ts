import { Query } from './Query'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'
import { AuthPayload } from './AuthPayload'
import { prismaMutations } from './Mutation/prismaMutations'

export default {
    Query,
    Mutation: {
        ...prismaMutations,
        ...auth,
        ...post,
    },
    AuthPayload,
}
