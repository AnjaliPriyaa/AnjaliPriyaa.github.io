const MEDIUM_FEED =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@anjalipriya_";

const TECH_TAG = "software-engineering"; // canonical Medium tag

async function fetchSoftwareEngineeringBlogs() {
  try {
    const response = await fetch(MEDIUM_FEED);
    const data = await response.json();

    if (!data || !Array.isArray(data.items)) {
      return [];
    }

    const techPosts = data.items.filter(post => {
      if (!Array.isArray(post.categories)) return false;

      return post.categories
        .map(tag => tag.toLowerCase())
        .includes(TECH_TAG);
    });

    return techPosts;
  } catch (error) {
    return [];
  }
}
