const { sequelize } = require('../database');
const Blog = require('../models/Blog');

async function debugDatabase() {
  try {
    console.log('🔍 Debugging Database...');
    
    // Check if database file exists and is accessible
    const result = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('📊 Tables in database:', result[0]);
    
    // Check blogs table specifically
    const blogCount = await Blog.count();
    console.log(`📝 Total blogs in database: ${blogCount}`);
    
    if (blogCount > 0) {
      const blogs = await Blog.findAll({ limit: 3 });
      console.log('📖 Sample blogs:');
      blogs.forEach(blog => {
        console.log(`   - ID: ${blog.id}, Title: ${blog.title}`);
      });
    } else {
      console.log('❌ No blogs found in database');
      
      // Try to manually insert one blog
      console.log('🔄 Trying to manually insert a blog...');
      try {
        const testBlog = await Blog.create({
          title: "Test Blog",
          slug: "test-blog",
          metaTitle: "Test Blog",
          metaDescription: "Test description",
          keywords: ["test"],
          content: "Test content",
          status: "published"
        });
        console.log('✅ Test blog inserted:', testBlog.id);
      } catch (insertError) {
        console.error('❌ Failed to insert test blog:', insertError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Database debug error:', error);
  } finally {
    process.exit(0);
  }
}

debugDatabase();