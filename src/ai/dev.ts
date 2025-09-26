import { config } from 'dotenv';
config();

import '@/ai/flows/generate-petition-draft.ts';
import '@/ai/flows/summarize-petition-arguments.ts';