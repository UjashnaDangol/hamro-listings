class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // ADVANCED FILTERING
  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "limit", "sort", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // FULL TEXT SEARCH (NEW)
  search() {
    if (this.queryString.search) {
      const keyword = this.queryString.search;

      this.query = this.query.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { "location.city": { $regex: keyword, $options: "i" } },
          { "location.district": { $regex: keyword, $options: "i" } },
        ],
      });
    }

    return this;
  }

  // SORTING ENGINE (SMART)
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // PAGINATION
  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default QueryFeatures;