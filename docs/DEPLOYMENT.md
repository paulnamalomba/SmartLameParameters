# 🚀 Deployment Guide for smartlameparameters.run.place

This guide provides step-by-step instructions to deploy the Smart Lamé Parameters Calculator to **smartlameparameters.run.place**.

---

## Prerequisites

- Node.js 18.x or 20.x installed
- npm or yarn package manager
- Git
- Domain configured: `smartlameparameters.run.place`
- Account on Netlify, Vercel, or AWS (choose one)

---

## Option 1: Deploy to Netlify (Recommended)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Build the Project

```bash
cd SmartLameParameters
npm install
npm run build
```

Verify the `dist/` folder is created with your production build.

### Step 3: Login to Netlify

```bash
netlify login
```

This opens a browser for authentication.

### Step 4: Deploy

```bash
netlify deploy --prod --dir=dist
```

Follow the prompts:
- **Create a new site** or select existing site
- **Site name**: `smart-lame-parameters` (or your preference)
- **Deploy directory**: `dist`

### Step 5: Configure Custom Domain

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. Go to **Domain settings** → **Add custom domain**
4. Enter: `smartlameparameters.space`
5. Follow DNS configuration instructions:

   **For DNS provider:**
   - Add A record: `185.199.108.153`
   - Add A record: `185.199.109.153`
   - Add A record: `185.199.110.153`
   - Add A record: `185.199.111.153`
   
   **Or use CNAME:**
   - CNAME: `smartlameparameters` → `your-site-name.netlify.app`

6. Wait for DNS propagation (up to 24 hours, usually <1 hour)
7. Netlify will automatically provision SSL certificate

### Step 6: Enable Continuous Deployment (Optional)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Save settings

Now every push to `main` branch auto-deploys!

---

## Option 2: Deploy to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Build the Project

```bash
cd SmartLameParameters
npm install
npm run build
```

### Step 3: Login to Vercel

```bash
vercel login
```

### Step 4: Deploy

```bash
vercel --prod
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Your account
- **Link to existing project**: No
- **Project name**: `smart-lame-parameters`
- **Directory**: `./`
- **Override settings**: No

### Step 5: Configure Custom Domain

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Add domain: `smartlameparameters.run.place`
5. Configure DNS:

   **Add A record:**
   - Host: `@`
   - Value: `76.76.21.21`
   
   **Or CNAME:**
   - Host: `smartlameparameters`
   - Value: `cname.vercel-dns.com`

6. Wait for DNS propagation
7. Vercel provisions SSL automatically

### Step 6: Enable Git Integration (Optional)

```bash
vercel link
```

Connect to GitHub repository for auto-deployment on push.

---

## Option 3: Deploy to AWS S3 + CloudFront

### Step 1: Install AWS CLI

```bash
# Windows (PowerShell)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Step 2: Configure AWS Credentials

```bash
aws configure
```

Enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region: `us-east-1`
- Output format: `json`

### Step 3: Create S3 Bucket

```bash
aws s3 mb s3://smartlameparameters.run.place
```

### Step 4: Enable Static Website Hosting

```bash
aws s3 website s3://smartlameparameters.run.place \
  --index-document index.html \
  --error-document index.html
```

### Step 5: Set Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::smartlameparameters.run.place/*"
    }
  ]
}
```

Apply policy:

```bash
aws s3api put-bucket-policy \
  --bucket smartlameparameters.run.place \
  --policy file://bucket-policy.json
```

### Step 6: Build and Upload

```bash
npm install
npm run build
aws s3 sync dist/ s3://smartlameparameters.run.place --delete
```

### Step 7: Create CloudFront Distribution

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. **Create Distribution**
3. Settings:
   - **Origin Domain**: `smartlameparameters.run.place.s3-website-us-east-1.amazonaws.com`
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Alternate Domain Names (CNAMEs)**: `smartlameparameters.run.place`
   - **SSL Certificate**: Request certificate from ACM
4. **Custom Error Responses**:
   - HTTP Error Code: 404
   - Response Page Path: `/index.html`
   - HTTP Response Code: 200
5. Save and wait for deployment (~15 minutes)

### Step 8: Configure DNS

Add CNAME record:
- Host: `smartlameparameters`
- Value: `d1234abcd.cloudfront.net` (your CloudFront domain)

### Step 9: Automate Future Deploys

Create `deploy.sh`:

```bash
#!/bin/bash
npm run build
aws s3 sync dist/ s3://smartlameparameters.run.place --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

Make executable:
```bash
chmod +x deploy.sh
```

Deploy:
```bash
./deploy.sh
```

---

## Verification Checklist

After deployment, verify:

- [ ] Site loads at `https://smartlameparameters.run.place`
- [ ] SSL certificate is valid (HTTPS works)
- [ ] All assets load correctly
- [ ] Calculator functionality works
- [ ] Unit conversion works
- [ ] Export features work (JSON, CSV, permalink)
- [ ] Responsive design on mobile
- [ ] No console errors
- [ ] Fast page load (<3s)

### Test Calculation

1. Enter **E = 210 GPa**
2. Enter **ν = 0.3**
3. Verify results:
   - μ ≈ 80.77 GPa
   - λ ≈ 121.15 GPa
   - K ≈ 175 GPa

---

## Monitoring & Analytics (Optional)

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Sentry Error Tracking

```bash
npm install @sentry/react
```

Add to `main.tsx`:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

---

## Rollback Procedure

### Netlify
```bash
netlify rollback
```

### Vercel
```bash
vercel rollback
```

### AWS S3
Keep previous `dist/` folder:
```bash
mv dist dist-backup
aws s3 sync dist-backup/ s3://smartlameparameters.run.place --delete
```

---

## Troubleshooting

### Issue: Site not loading
- Check DNS propagation: `nslookup smartlameparameters.run.place`
- Wait 24 hours for full DNS propagation
- Clear browser cache

### Issue: 404 errors on refresh
- Verify SPA routing is configured (netlify.toml, vercel.json)
- Check CloudFront error responses

### Issue: Assets not loading
- Check CORS headers
- Verify file paths are relative, not absolute
- Check S3 bucket policy for public read access

### Issue: Slow loading
- Enable compression (gzip/brotli)
- Check CDN is serving content
- Optimize images and assets

---

## Support

- **Documentation**: See [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/paulnamalomba/SmartLameParameters/issues)
- **Author**: [@paulnamalomba](https://github.com/paulnamalomba)

---

**🎉 Deployment Complete!**

Your Smart Lamé Parameters Calculator is now live at **smartlameparameters.run.place**!
