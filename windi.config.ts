import {defineConfig} from "windicss/helpers";
import tailwind from './tailwind.config.cjs';

export default defineConfig({
  theme: tailwind.theme,
})
