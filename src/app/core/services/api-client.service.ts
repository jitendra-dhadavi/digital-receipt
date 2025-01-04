import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientOptions, CustomHeaders, ApiClientMethods } from '../../types/api-client.types';

/**
 * A service that provides HTTP methods (GET, POST, PUT, DELETE, PATCH) for interacting with an API.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiClientService implements ApiClientMethods {
  private readonly _http = inject(HttpClient);

  /**
   * Creates headers for HTTP requests.
   * 
   * @param contentType - The content type (e.g., 'application/json', 'multipart/form-data').
   * @param customHeaders - Optional custom headers to include in the request.
   * @returns An `HttpHeaders` instance with the specified headers.
   */
  private createHeaders(contentType?: string, customHeaders: CustomHeaders = {}): HttpHeaders {
    const defaultHeaders = contentType ? { 'Content-Type': contentType } : {};
    const sanitizedHeaders = Object.entries({ ...defaultHeaders, ...customHeaders })
      .reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

    return new HttpHeaders(sanitizedHeaders);
  }

  /**
   * Creates options for HTTP requests.
   * 
   * @param options - An object containing the request options (e.g., content type, custom headers, params, etc.)
   * @returns An options object to pass to Angular's HttpClient methods.
   */
  private createOptions({
    contentType = 'application/json',
    customHeaders = {},
    params,
    observe = 'body',
    responseType = 'json',
  }: ApiClientOptions = {}): object {
    const headers = this.createHeaders(contentType, customHeaders);
    return {
      headers,
      params,
      observe,
      responseType,
    };
  }

  /**
   * Makes a GET request.
   * 
   * @param url - The URL to send the GET request to.
   * @param params - Optional query parameters.
   * @param customHeaders - Optional custom headers.
   * @returns An `Observable` of the response.
   */
  get<T>(
    url: string,
    params?: HttpParams | Record<string, string | string[]>,
    customHeaders?: CustomHeaders
  ): Observable<T> {
    const options = this.createOptions({ params, customHeaders });
    return this._http.get<T>(url, options);
  }

  /**
   * Makes a POST request.
   * 
   * @param url - The URL to send the POST request to.
   * @param data - The data to send in the body of the request.
   * @param contentType - The content type of the request body (e.g., 'application/json', 'multipart/form-data'). Default is 'application/json'.
   * @param customHeaders - Optional custom headers.
   * @returns An `Observable` of the response.
   */
  post<T, D>(
    url: string,
    data: D,
    contentType = 'application/json',
    customHeaders?: CustomHeaders
  ): Observable<T> {
    const options = this.createOptions({
      contentType: contentType === 'multipart/form-data' ? undefined : contentType,
      customHeaders,
      observe: contentType === 'application/zip' ? 'events' : 'body',
      responseType: contentType === 'application/zip' ? 'blob' : 'json',
    });
    const body = contentType === 'multipart/form-data' ? data : JSON.stringify(data);
    return this._http.post<T>(url, body, options);
  }

  /**
   * Makes a PUT request.
   * 
   * @param url - The URL to send the PUT request to.
   * @param data - The data to send in the body of the request.
   * @param contentType - The content type of the request body (e.g., 'application/json'). Default is 'application/json'.
   * @param customHeaders - Optional custom headers.
   * @returns An `Observable` of the response.
   */
  put<T, D>(
    url: string,
    data: D,
    contentType = 'application/json',
    customHeaders?: CustomHeaders
  ): Observable<T> {
    const options = this.createOptions({ contentType, customHeaders });
    return this._http.put<T>(url, JSON.stringify(data), options);
  }

  /**
   * Makes a DELETE request.
   * 
   * @param url - The URL to send the DELETE request to.
   * @param customHeaders - Optional custom headers.
   * @returns An `Observable` of the response.
   */
  delete<T>(
    url: string,
    customHeaders?: CustomHeaders
  ): Observable<T> {
    const options = this.createOptions({ customHeaders });
    return this._http.delete<T>(url, options);
  }

  /**
   * Makes a PATCH request.
   * 
   * @param url - The URL to send the PATCH request to.
   * @param data - The data to send in the body of the request.
   * @param contentType - The content type of the request body (e.g., 'application/json'). Default is 'application/json'.
   * @param customHeaders - Optional custom headers.
   * @returns An `Observable` of the response.
   */
  patch<T, D>(
    url: string,
    data: D,
    contentType = 'application/json',
    customHeaders?: CustomHeaders
  ): Observable<T> {
    const options = this.createOptions({ contentType, customHeaders });
    return this._http.patch<T>(url, JSON.stringify(data), options);
  }
}
