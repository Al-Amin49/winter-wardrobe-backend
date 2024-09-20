

export class QueryBuilder {
  constructor(modelQuery, query) {
    this.query = query;
    this.modelQuery = modelQuery;
  }

  search(searchableFields) {
    const searchTerm = this.query?.searchTerm || "";

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }

    return this;
  }

  paginate() {
    const limit = Number(this.query?.limit || 10);
    const page = Number(this.query?.page || 1);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  sort() {
    const sortBy = this.query?.sortBy || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  fields() {
    const fields = this.query?.fields
      ? this.query.fields.split(",").join(" ")
      : "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  filter(excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"]) {
    const queryObj = { ...this.query };
    excludeFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  build() {
    return this.modelQuery;
  }
}
