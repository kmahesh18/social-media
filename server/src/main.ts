import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add CORS for Vercel deployment
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Enable shutdown hooks
  app.enableShutdownHooks();
  
  // Handle Vercel serverless deployment
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
