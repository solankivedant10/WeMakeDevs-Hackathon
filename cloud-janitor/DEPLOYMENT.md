# 🚀 Vercel Deployment Guide for Cloud Janitor

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Cloud Janitor repository pushed to GitHub

---

## Step 1: Prepare Your Repository

### 1.1 Ensure All Files Are Committed
```bash
cd c:\Users\HP\Downloads\Hackathon\cloud-janitor
git add .
git commit -m "feat: Cloud Janitor - AI-powered FinOps automation with Gemini"
git push origin main
```

### 1.2 Verify Dashboard Structure
Your dashboard should have:
- ✅ `dashboard/package.json`
- ✅ `dashboard/src/app/page.tsx`
- ✅ `dashboard/src/data/waste-report.json`
- ✅ `dashboard/next.config.ts`

---

## Step 2: Deploy to Vercel

### 2.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your **cloud-janitor** repository

### 2.2 Configure Project Settings
Vercel will auto-detect Next.js. Configure:

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** `dashboard`
**Build Command:** `npm run build` (auto-filled)
**Output Directory:** `.next` (auto-filled)
**Install Command:** `npm install` (auto-filled)

### 2.3 Environment Variables (Optional)
If you want to add dynamic features later:
- Click **"Environment Variables"**
- Add any secrets (e.g., `GEMINI_API_KEY` for future API routes)

### 2.4 Deploy!
Click **"Deploy"**

Vercel will:
1. Clone your repository
2. Install dependencies
3. Build the Next.js app
4. Deploy to edge network
5. Provide a live URL (e.g., `cloud-janitor.vercel.app`)

**Deployment time:** ~2-3 minutes

---

## Step 3: Verify Deployment

### 3.1 Check Deployment Status
- ✅ Build logs show no errors
- ✅ Deployment status: "Ready"
- ✅ Live URL is accessible

### 3.2 Test the Dashboard
Visit your deployment URL and verify:
- ✅ Dashboard loads without errors
- ✅ Hero stats show correct numbers ($7,522.08 annual savings)
- ✅ Charts render correctly (donut + bar chart)
- ✅ Zombie table displays all 5 resources
- ✅ Buttons are interactive
- ✅ Glassmorphism effects are visible
- ✅ Animations work (counter, fade-ins)

### 3.3 Performance Check
Vercel provides automatic performance metrics:
- **Lighthouse Score:** Should be 90+ for Performance
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s

---

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain
1. Go to your project settings
2. Click **"Domains"**
3. Add your custom domain (e.g., `cloudjanitor.dev`)
4. Follow DNS configuration instructions

### 4.2 SSL Certificate
Vercel automatically provisions SSL certificates (HTTPS) for all domains.

---

## Step 5: Continuous Deployment

### 5.1 Automatic Deployments
Every push to `main` branch will trigger automatic deployment:
```bash
git add .
git commit -m "update: dashboard improvements"
git push origin main
# Vercel automatically deploys!
```

### 5.2 Preview Deployments
Every pull request gets a unique preview URL for testing.

---

## Troubleshooting

### Issue: Build Fails
**Solution:** Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure no TypeScript errors
- Check that all imports are correct

### Issue: Data Not Loading
**Solution:** Verify JSON file path
- File should be at `dashboard/src/data/waste-report.json`
- Import path: `@/data/waste-report.json`
- File is bundled at build time (no runtime loading needed)

### Issue: Styles Not Working
**Solution:** Check Tailwind CSS configuration
- Verify `@import "tailwindcss"` in `globals.css`
- Ensure all custom classes are defined
- Check browser console for CSS errors

---

## Vercel Features You Get

### ✅ Edge Network
- Global CDN for fast loading worldwide
- Automatic caching and optimization

### ✅ Analytics
- Real-time visitor analytics
- Performance monitoring
- Error tracking

### ✅ Serverless Functions (Future)
If you add API routes later:
- Automatic scaling
- Zero configuration
- Built-in monitoring

### ✅ Preview Deployments
- Every PR gets a unique URL
- Test changes before merging
- Share with team/judges

---

## For Judges

### Live Demo URL
After deployment, add this to your README:

```markdown
## 🌐 Live Demo

**Dashboard:** [https://cloud-janitor.vercel.app](https://cloud-janitor.vercel.app)

The dashboard is deployed on Vercel's edge network for instant global access.
```

### Deployment Badge
Add this badge to your README:

```markdown
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://cloud-janitor.vercel.app)
```

---

## Compliance Checklist

For **Stormbreaker Award ($2k):**
- ✅ Project is deployed on Vercel
- ✅ Live URL is accessible
- ✅ Dashboard is fully functional
- ✅ No server-side dependencies (static data)
- ✅ Fast performance (< 3s load time)
- ✅ Professional presentation

**Status:** READY TO SUBMIT! 🎉

---

## Next Steps After Deployment

1. **Test the live URL** thoroughly
2. **Add the URL to your README**
3. **Take screenshots** of the live dashboard
4. **Share the URL** in your hackathon submission
5. **Monitor analytics** during judging period

---

## Support

If you encounter issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Verify all files are committed to GitHub
- Ensure `dashboard` directory structure is correct

**Deployment should take < 5 minutes total!** 🚀
