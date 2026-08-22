import connectDB from '@/config/db';
import SiteContent, { ISiteContent } from '@/models/SiteContent';
import { getDefaultSiteContent } from '@/config/defaultCmsContent';

/**
 * Fetch current site content from DB, or seed initial default and return it.
 */
export async function getSiteContent(): Promise<any> {
  try {
    await connectDB();
    let content = await SiteContent.findOne().lean();

    if (!content) {
      const defaultData = getDefaultSiteContent();
      const newDoc = await SiteContent.create(defaultData);
      return JSON.parse(JSON.stringify(newDoc));
    }

    return JSON.parse(JSON.stringify(content));
  } catch (error) {
    console.warn('[SiteContent Service] DB connection issue, falling back to static config:', error);
    return getDefaultSiteContent();
  }
}

/**
 * Update site content in MongoDB.
 */
export async function updateSiteContent(data: Partial<ISiteContent>): Promise<any> {
  await connectDB();
  let content = await SiteContent.findOne();

  if (!content) {
    const defaultData = getDefaultSiteContent();
    content = new SiteContent({ ...defaultData, ...data });
  } else {
    Object.assign(content, data);
  }

  await content.save();
  return JSON.parse(JSON.stringify(content));
}

/**
 * Reset site content to official 33-year defaults.
 */
export async function resetSiteContent(): Promise<any> {
  await connectDB();
  const defaultData = getDefaultSiteContent();
  await SiteContent.deleteMany({});
  const newDoc = await SiteContent.create(defaultData);
  return JSON.parse(JSON.stringify(newDoc));
}
