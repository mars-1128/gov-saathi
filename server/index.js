// GOV SAATHI - LOCAL SERVER ENTRYPOINT
import { app } from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🇮🇳 GOV SAATHI SERVER RUNNING ON http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
