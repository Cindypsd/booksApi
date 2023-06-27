const validateUserData = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  if (!password) return res.status(400).json({ error: 'Missing password' });
  next();
};

const validateListName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing list name' });
  next();
};

const validateListId = (req, res, next) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing list ID' });
  next();
};

const validateBookTitle = (req, res, next) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Missing book title' });
  }

  next();
};

module.exports = {
  validateUserData,
  validateListId,
  validateListName,
  validateBookTitle,
};
