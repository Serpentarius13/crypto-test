/// <reference types="vite/client" />

import { debounce } from "./shared/utils/debounce/debounce";

declare module "@pinia/plugin-debounce" {
  export interface Config {
    Debounce: typeof debounce;
  }
}
