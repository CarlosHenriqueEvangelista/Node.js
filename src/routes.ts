import { Router } from 'express'
import CommentController from './controllers/CommentController'
import Last3Comments from './controllers/ThreeLastCommentsController'
import UserAuthenticationController from './controllers/UserAuthenticationController'
import UserProfileController from './controllers/UserProfileController'
import CommentValidated from './middlewares/CommentValidation'

const RoutesManager = Router()

RoutesManager.post(
  '/authentication',
  new UserAuthenticationController().tolerate
)

RoutesManager.post(
  '/comments',
  CommentValidated,
  new CommentController().tolerate
)

RoutesManager.get('/comments/last3', new Last3Comments().tolerate)

RoutesManager.get(
  '/profile',
  CommentValidated,
  new UserProfileController().tolerate
)

export default RoutesManager
