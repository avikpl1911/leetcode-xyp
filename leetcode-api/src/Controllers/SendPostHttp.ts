//import { IncomingMessage } from 'node:http';
//import { RequestOptions } from 'node:https';
import * as url from 'node:url';

function sendHttpPostJson(
  urlString: string,
  jsonData: Record<string, any>, // Generic object type for JSON data
  headers: Record<string, string> = {}
): Promise<any> {  // Now returning a Promise that resolves to a string (the body)
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = url.parse(urlString);
      const postData = JSON.stringify(jsonData); // Stringify the JSON object

      const options: any = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
        path: parsedUrl.path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Force JSON content type
          'Content-Length': Buffer.byteLength(postData),
          ...headers,
        },
        body:postData
      };

      const protocol = parsedUrl.protocol === 'https:' ? require('node:https') : require('node:http');

      const req = protocol.request(options, (res: any) => {
        let responseData = '';

        res.on('data', (chunk: string) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData);  // Resolving only the body (responseData)
          } else {
            reject({
              statusCode: res.statusCode || 0,
              headers: res.headers,
              body: responseData,
            });
          }
        });
      });

      req.on('error', (error: Error) => {
        reject(error);
      });

      req.write(postData); // Send the JSON string
      req.end();

    } catch (error) {
      reject(error);
    }
  }).catch((x)=>{console.log(x)});
}

export default sendHttpPostJson ;