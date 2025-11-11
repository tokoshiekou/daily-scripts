/**
 * 
 * @param {string} matchAttribute The attribute of the object to be matched
 * @param {string} matchContent The content of the object to be matched
 * @param {string} targetAttribute The target attribute to retrieve
 */
async function test(matchAttribute = 'initiatorType', matchContent, targetAttribute) {
  const resList = [];
  const errList = [];

  // Get the network requests of the currently loaded page
  const entries = window.performance.getEntries();
  
  // Filter the required request content based on `initiatorType`
  for (const item of entries) {
    // Filter for content that matches the attribute
    if (item[matchAttribute] === matchContent) {
      try {
        // Send a fetch request based on the target attribute
        const response = await fetch(item[targetAttribute]);
        // Format the content as JSON data
        const res = await response.json();
        resList.push(res);
        console.log(res);
      } catch (error) {
        errList.push({ item, url: item[targetAttribute] });
        console.error('Request error:', error);
      }
    }
  }

  console.log('Successful results:', resList);
  console.log('Failed results:', errList);
  // Combine the collected request contents into an object
  customBookObj(resList)
}

/**
 * 
 * @param {Array} list Array of book objects
 */
function customBookObj(list) {
  const arrayList = list;
  const book_obj = {};
  // Extract the first item
  const baseInfo = arrayList.shift();
  const { sections, introduction, booklet } = baseInfo.data;
  const { title, summary, cover_img } = booklet.base_info;
  Object.assign(book_obj, {
      book_name: title,
      book_desc: summary,
      book_bg: cover_img,
      book_lab: sections,
      book_content: introduction.content
  });

  // Use the remaining data to construct an article list
  const articleList = [];
  arrayList.map(item => {
      const article = {};
      const { ctime, title, section_id, content } = item.data.section;
      Object.assign(article, { ctime, title, section_id, content });
      articleList.push(article);
  });
  // Add the articles
  const sortArticle = articleList.sort((a, b) => a.ctime - b.ctime);
  book_obj['book_article'] = sortArticle;
  console.log(book_obj);
}
