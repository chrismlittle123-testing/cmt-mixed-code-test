/**
 * MONO-001: Frontend TypeScript package
 * Separate package in monorepo structure
 */

export interface FrontendConfig {
  apiUrl: string;
  theme: "light" | "dark";
}

export function initFrontend(config: FrontendConfig): void {
  console.log(`Initializing frontend with API: ${config.apiUrl}`);
  console.log(`Theme: ${config.theme}`);
}

export function renderComponent(name: string): string {
  return `<div class="component">${name}</div>`;
}
