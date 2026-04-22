import "./docs/openapi";
import "./docs/auth.openapi";
import "./docs/users.openapi";
import "./docs/roles.openapi";
import "./docs/step.openapi";
import "./docs/question-type.openapi";
import "./docs/question.openapi";
import "./docs/answer.openapi";
import "./docs/badge.openapi";
import "./docs/activity.openapi";
import "./docs/answer-badge.openapi";
import "./docs/user-answer.openapi";

import express, { Express } from "express";
import { authRouter, rolesRouter, usersRouter, stepRouter, questionTypeRouter, questionRouter, answerRouter, badgeRouter, activityRouter, answerBadgeRouter, userAnswerRouter } from "./routes";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./docs";

export const app: Express = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/steps", stepRouter);
app.use("/api/question-types", questionTypeRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);
app.use("/api/answers", answerBadgeRouter);
app.use("/api/badges", badgeRouter);
app.use("/api/activities", activityRouter);
app.use("/api/user-answers", userAnswerRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
