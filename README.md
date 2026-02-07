# Anjali Priya - Software Engineer Portfolio

A clean, modern portfolio website showcasing Software and Cloud engineering expertise, designed for deployment on GitHub Pages.

## Features

- ✨ Modern dark theme design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Smooth animations and transitions
- � Certifications showcase section
- �📧 Contact form
- 🔗 Social media links (LinkedIn, Twitter/X, Medium Tech Blogs, GitHub)
- 🚀 Ready for GitHub Pages deployment
- 📚 Medium link filtered to show only technical blogs

## Quick Start

### 1. Customize Your Information

Edit `index.html` to add your personal information:

- **Name & Title**: Already configured for Anjali Priya, Software Engineer
- **Social Links**: Configured with LinkedIn, Twitter, Medium (tech blogs only), GitHub
- **Skills**: Software, Cloud (AWS, Azure, OCI), IaC (Terraform, Ansible), CI/CD, Kubernetes
- **Work Experience**: IBM, State Street Corporation, HighRadius
- **Certifications**: Oracle Cloud Infrastructure 2024 Foundation Associate, AWS Certified Cloud Practitioner
- **Contact Info**: Email (anj70785@gmail.com), Location (Bengaluru, India)

### 2. Social Media Links

Configured links:
- Twitter/X: `https://twitter.com/AnjaliPriyaa`
- LinkedIn: `https://linkedin.com/in/AnjaliPriyaa24`
- Medium (Tech Blogs Only): `https://medium.com/@anj70785/tagged/tech`
- GitHub: `https://github.com/AnjaliPriyaa`

**Note:** The Medium link uses `/tagged/tech` to filter and show only technical articles.

### 3. Deploy to GitHub Pages

#### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub named `your-username.github.io`
2. Upload all files (index.html, styles.css, script.js)
3. Go to Settings → Pages
4. Select source: "Deploy from a branch"
5. Select branch: "main" and folder: "/ (root)"
6. Click Save
7. Your site will be live at `https://your-username.github.io`

#### Option 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add remote repository
git remote add origin https://github.com/your-username/your-username.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in your repository settings.

### 4. Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file with your domain name
2. Configure your domain's DNS settings
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Customization Tips

### Colors

Edit the CSS variables in `styles.css` (lines 9-15):

```css
:root {
    --bg-dark: #1a1a1a;
    --bg-darker: #0f0f0f;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --accent-cyan: #00f5ff;
    --accent-pink: #ff006e;
}
```

### Add More Sections

To add a new section:
1. Add a navigation link in the sidebar
2. Create a new section with class "section" in the main content
3. Style it in `styles.css`

### Contact Form

The current form shows an alert. To make it functional:
1. Use a service like Formspree, Form submit, or Netlify Forms
2. Update the form action attribute
3. Or keep it as is for email click-through

## File Structure

```
Portfolio/
│
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

- No external dependencies
- Fast loading time
- Optimized for GitHub Pages
- SEO friendly

## License

Feel free to use this template for your own portfolio!

## Need Help?

- Check GitHub Pages documentation: https://pages.github.com/
- Make sure all files are in the root directory
- Ensure file names are exactly: `index.html`, `styles.css`, `script.js`

---

Made with ❤️ for GitHub Pages
