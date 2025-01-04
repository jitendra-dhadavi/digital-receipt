import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Type for custom headers, allows dynamic keys and string values
export type CustomHeaders = Record<string, string>;

// Type for options passed to HttpClient methods
export interface ApiClientOptions {
  contentType?: string; // Content type (e.g., application/json, multipart/form-data)
  customHeaders?: CustomHeaders; // Custom headers to be passed
  params?: HttpParams | Record<string, string | string[]>; // Query params
  observe?: 'body' | 'events'; // Type of observation
  responseType?: 'json' | 'blob' | 'text'; // Type of response body
}

// Type for the API client methods
export interface ApiClientMethods {
  get<T>(url: string, params?: HttpParams | Record<string, string | string[]>, customHeaders?: CustomHeaders): Observable<T>;
  post<T, D>(url: string, data: D, contentType?: string, customHeaders?: CustomHeaders): Observable<T>;
  put<T, D>(url: string, data: D, contentType?: string, customHeaders?: CustomHeaders): Observable<T>;
  delete<T>(url: string, customHeaders?: CustomHeaders): Observable<T>;
  patch<T, D>(url: string, data: D, contentType?: string, customHeaders?: CustomHeaders): Observable<T>;
}
