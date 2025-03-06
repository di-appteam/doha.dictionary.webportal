import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
type ConfigKeys = keyof typeof environment; // Ensures only valid keys are used

@Injectable({
  providedIn: 'root',
})
export class ConfigJsonService {
  static config: any;
 
  constructor(private http: HttpClient) {}

  // Load configuration from the assets/config/config.json file
  async loadConfig(): Promise<void> {
    try {
      const config = await this.http.get('./assets/config/config.json').toPromise();
      ConfigJsonService.config = config;
    } catch (error) {
      console.error('Failed to load configuration:', error);
      ConfigJsonService.config = {}; // Fallback to an empty object to prevent runtime errors
    }
  }

  // Retrieve a value from the loaded config, with optional fallback to environment values
  getConfig(key: ConfigKeys): any {
    if (ConfigJsonService.config && key in ConfigJsonService.config) {
      return ConfigJsonService.config[key];
    }
    if (key in environment) {
      return environment[key];
    }
    return null;
  }

  // Determine whether the app is in development mode
  get IsDevelopment(): boolean {
    const key = 'production';
    const value = this.getConfig(key);
    return value === null ? !environment.production : !value;
  }

  // Retrieve the service base URL with a fallback to an empty string
  get AppIsOldVersionMode(): boolean {
    return this.getConfig('oldVersion') ?? false; // Replace ?? with ||
  }

  // Retrieve the service base URL with a fallback to an empty string
  get ServiceBaseUrl(): string {
    return this.getConfig('baseUrl') ?? ''; // Replace ?? with ||
  }
  
  // Retrieve the Share Url with a fallback to an empty string
  get ShareUrl(): string {
    return this.getConfig('shareUrl') ?? ''; // Replace ?? with ||
  }

  // Generate the reference path based on the service base URL
  get refPath(): string {
    return `${this.ServiceBaseUrl}/api/SummaryDocuments/GetReferenceCover?refId=`;
  }
}
