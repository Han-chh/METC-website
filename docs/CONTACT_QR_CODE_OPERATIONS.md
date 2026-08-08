# Join METC WeChat QR code — operator guide

This file is for repository and deployment operators. It is not linked from the public website.

## Replace the QR code

1. Export the current METC WeChat QR code as a square PNG image.
2. Add or replace the file at:

   ```
   public/images/contact/wechat-join-qr.png
   ```

3. Keep the filename exactly as shown. Use a clear image at least 600 × 600 pixels, without extra borders or text around the code.
4. In `components/homepage/community-actions.tsx`, change `JOIN_QR_CODE_IS_CONFIGURED` from `false` to `true`.
5. Run `pnpm build` and deploy the resulting static site as usual.

The Join us dialog reads this local public file. No upload process, path, or operational instruction is exposed in the frontend.
