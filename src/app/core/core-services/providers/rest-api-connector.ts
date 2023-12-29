import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { head } from 'lodash';
import { environment } from 'environments/environment';

@Injectable()
export class RestAPIConnectorProvider {

  headers: any = {};

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * 
   * Forms the request url
   * 
   * @param api api end point
   * @returns 
   */
  private appendUri(api: string): string {

    return environment.apiUri + api;

  }

  /**
   * 
   * Rest api GET request
   * 
   * @param api Api URL
   * @param params Input Parameters
   * @param headers Headers
   * @param options options
   * @returns 
   */
  public get(api: string, params?: any, headers?, options?): Observable<any> {

    let headersObj = new HttpHeaders(headers);

    let requestOptions = { headers: headersObj, params: params };

    if (options) {

      requestOptions = Object.assign(requestOptions, options);

    }

    return this.http.get(this.appendUri(api), requestOptions);
  }

  /**
   * 
   * Rest api POST request
   * 
   * @param api Api URL
   * @param params Input Parameters
   * @param headers Headers
   * @returns 
   */
  public post(api: string, params?: object, headers?): Observable<any> {

    let headersObj = new HttpHeaders(headers);

    return this.http.post(this.appendUri(api), params, { headers: headersObj });
  }

  /**
   * 
   * Rest api PUT request
   * 
   * @param api Api URL
   * @param params Input Parameters
   * @param headers Headers
   * @returns 
   */
  public put(api: string, params: object, headers?): Observable<any> {

    let headersObj = new HttpHeaders(headers);

    return this.http.put(this.appendUri(api), params, { headers: headersObj });

  }

  /**
   * 
   * Rest api DELETE request
   * 
   * @param api Api URL
   * @param headers Headers
   * @returns 
   */
  public delete(api: string, params?: object): Observable<any> {

    return this.http.request('delete', this.appendUri(api));

  }

}
