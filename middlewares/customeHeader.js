const customeHeader = (req, res, next) => {
  try {
    const { host } = req.headers;

    if (host && host.split(":").pop() === "5000") next();
    else res.status(403).json({ msg: `No es correcto` });

  } catch (error) {
    res.status(403).json({ msg: error.message });
  }
};

module.exports = customeHeader;
