import { NestFactory } from "@nestjs/core";
import { log } from "console";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
// import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });
  await app.listen(PORT, () => {
    log("Service started on port " + PORT);
  });
}

start();
