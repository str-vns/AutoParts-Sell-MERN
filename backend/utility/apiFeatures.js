class APIFeatures
{
   constructor(query, queryStringy)
   {
    this.query = query;
    this.queryStringy = queryStringy;
   }

   search()
   {
    console.log(this.queryStringy)
    const keyword = this.queryStringy.keyword ? {
    name:
    {
        $reyex: req.queryStringy.keyword,
        $options: 'i'
    }
   } : {}
   console.log(this.queryStringy,keyword, this.query);
   this.query = this.query.find({...keyword});
   return this;
   }

   filter()
   {
    const queryCopy = { ...this.queryStringy};
    const removeFields = ['keyword', 'limit', 'page']
    removeFields.forEach(el => delete queryCopy[el]);

    let queryStringy = JSON.stringify(queryCopy);
    console.log(queryStringy);
    queryStringy = queryStringy.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    console.log(JSON.parse(queryStringy));
    this.query = this.query.find(JSON.parse(queryStringy));

    return this;
   }

   pagination(PerPage)
   {
    const currentPage = Number(this.queryStringy.page) || 1;
    const skip = PerPage * (currentPage - 1);
    this.query = this.query.limit(PerPage).skip(skip);
    return this
   }
}

module.exports = APIFeatures;
