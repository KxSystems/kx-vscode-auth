/
 * Copyright (c) 1998-2025 Kx Systems Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
\

\d .portier

get_keys: {
  config: .j.k raze system "curl -s https://broker.portier.io/.well-known/openid-configuration";
  system "curl -s -o portier_keys.json ",config[`jwks_uri];
  }

verify: {[token]
  get_keys[];
  decode: "jwt decode --alg RS256 --secret @portier_keys.json --json ",token;
  decoded: .j.k raze system decode;
  decoded[`payload][`email]
  }

\d .

.z.pw:{[ignore; token] 
  email: @[.portier.verify; token; "error"];
  show email;
  $[email ~ "error"; 0b; 1b]
  }

"Authentication enabled!"
