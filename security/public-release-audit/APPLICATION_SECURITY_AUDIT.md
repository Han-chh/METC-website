# Application Security Audit

## Architecture and Endpoint Inventory

The application is a Next.js 16 App Router static export. A verified production build generated only static routes: `/`, `/activities`, `/teaching`, `/voices`, `/_not-found`, and `/icon.svg`.

There are no API routes, route handlers, middleware, Server Actions, server components with mutations, authentication, admin/root UI, database, backend storage SDK, runtime upload, delete, reorder, publish/unpublish, webhook, or cron endpoint.

## Authentication and Authorization

Authentication and application authorization are not applicable. The language setting uses local storage. The `viewed-feedback` cookie contains only short client-side UI IDs; it is not a role/session credential and is correctly not treated as authorization.

| Operation | Endpoint/control | Authn | Authz | Server enforcement | Assessment |
|---|---|---:|---:|---:|---|
| Read site and R2 resources | Static GET | No | No | N/A | Public by design |
| Upload/edit/delete/reorder | None | N/A | N/A | N/A | Not implemented |
| Publish/admin management | Git/Vercel/R2 control planes | External | Required externally | External | Manual verification |
| Admin login | None | N/A | N/A | N/A | Not implemented |

No hidden-button-as-authorization issue exists because no administrative function exists in the app.

## API and Dangerous-API Review

No application use of `eval`, `new Function`, child processes, shell execution, filesystem reads, dynamic SQL/NoSQL, unsafe redirects, arbitrary URL server fetch, or CORS handlers was found. CSRF, IDOR, request-method validation, rate limiting, SSRF, command injection, path traversal, and mass assignment are not applicable to the deployed static app.

The local conversion tools use subprocess argument arrays. They do not demonstrate shell injection, but the parsers themselves are a public-contribution attack surface.

## Remote HTML / DOM XSS

`components/teaching/course-syllabus.tsx` fetches an HTML fragment from R2 and uses `dangerouslySetInnerHTML`. `convert_docx.py` implements a strong generation-time allowlist: scripts/styles/head/meta/link are skipped; event attributes are not copied; links are limited to empty/http/https/mailto schemes; images must exist in the generated asset directory.

Current committed syllabus fragments contained no active tag, event attribute, `javascript:` URL, iframe/object/embed/form, or active-content signature. However, an R2 object can be replaced outside this pipeline, and the browser does not sanitize the response. This is a medium stored-DOM-XSS trust issue, amplified by the lack of CSP.

## File and Content Processing

There is no web upload. The local pipeline accepts repository-controlled DOCX, PPT/PPTX, PDF, raster, and HEIC inputs. It invokes LibreOffice, Poppler, Pillow, and `sips`; it has no byte-size ceilings, decompression limits, malware scan, sandbox, or content-signature validation. Public contributors can target maintainers who follow the documented local conversion workflow.

Recommended control: disposable patched container/VM, no credentials or home-directory mounts, CPU/memory/file limits, MIME and archive-structure validation, malware scan, and trusted-review approval before processing.

## Next.js and Browser Exposure

- `NEXT_PUBLIC_*` values are public by definition; no secret is assigned to them.
- The resource base URL is a public identifier.
- Production build emits no browser source maps.
- Student contact data is compiled into browser output.
- `images.unoptimized: true` and static export mean the Next image optimizer and server-side `sharp` path are not exposed.
- The fixed development redirect does not create an open redirect.
- No production security headers are repository-controlled; hosting configuration is required.

## Upload / Database / R2 Summary

- Runtime upload: not applicable.
- Database: not applicable.
- R2 credentials: none in code/history; browser receives public read URL only.
- Presigned URLs: none.
- R2 write ACL/CORS/versioning: manual verification required.
