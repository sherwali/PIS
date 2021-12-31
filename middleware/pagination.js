export function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec()) > 0) {
      results.next = { page: page + 1, limit: limit };
    }

    if (startIndex > 0) {
      results.previous = { page: page - 1, limit: limit };
    }

    results.totalPages = Math.trunc(
      (await model.countDocuments().exec()) / limit + 1
    );

    try {
      results.results = await model
        .find()
        .sort([["_id", -1]])
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export function paginatedResultsForQuotation(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec()) > 0) {
      results.next = { page: page + 1, limit: limit };
    }

    if (startIndex > 0) {
      results.previous = { page: page - 1, limit: limit };
    }

    results.totalPages = Math.trunc(
      (await model.countDocuments().exec()) / limit + 1
    );

    try {
      results.results = await model
        .find()
        .sort([["_id", -1]])
        .limit(limit)
        .skip(startIndex)
        .populate("companies", "name address")
        .populate("products.product", "name unit")
        .exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
