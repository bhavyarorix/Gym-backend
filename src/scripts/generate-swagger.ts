import fs from 'fs';
import path from 'path';
import swaggerSpec from '../config/swagger';

const swaggerJson = JSON.stringify(swaggerSpec, null, 2);

fs.writeFileSync(
  path.join(__dirname, '../../swagger.json'),
  swaggerJson
);

console.log('✅ Swagger documentation generated successfully!');