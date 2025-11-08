const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const multer = require('multer');


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://globalstockmarketssmltrd.site',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));




// 📌 Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.status(200).json({ message: '¡Bienvenido al API de BlackRock! El servidor está funcionando correctamente.' });
});

const USERS_FILE = path.join(__dirname, 'src/data/users.json'); 
const SALT_ROUNDS = 10;

// 📌 Ruta para inicio de sesión (login)
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan email o contraseña' });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  res.json({ message: 'Inicio de sesión exitoso', user });
});

//  Obtener todos los usuarios
app.get('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  res.json({ users });
});

app.post('/api/users', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  // Generar un ID único (mayor existente + 1)
  const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
  const newUser = {
    id: maxId + 1,
    ...req.body,
    balance: typeof req.body.balance === 'number' ? req.body.balance : 0,
    balanceNFT: typeof req.body.balanceNFT === 'number' ? req.body.balanceNFT : 0,
    nfts: [],
    accounts: [],
    profileImage: null, 
  };

  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));

  res.status(201).json({ message: 'Usuario creado', user: newUser });
});

// Configuración de multer para guardar imágenes en /public/profile-images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/profile-images'));
  },
  filename: function (req, file, cb) {
    // Nombre: userID-timestamp.ext
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.id}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

app.post('/api/users/:id/profile-image', upload.single('image'), (req, res) => {
  console.log('📸 Imagen recibida:', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  // Guarda la URL absoluta de la imagen en el usuario
  const DOMAIN = "https://globalstockmarketssmltrd.site";
  const imageUrl = `${DOMAIN}/profile-images/${req.file.filename}`;
  users[userIndex].profileImage = imageUrl;
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.json({ message: 'Imagen de perfil actualizada', imageUrl });
});

// Servir imágenes estáticas
app.use('/profile-images', express.static(path.join(__dirname, 'public/profile-images')));

// 📌 Eliminar usuario por `id`
app.delete('/api/users/:id', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  users = users.filter((user) => user.id !== parseInt(req.params.id));

  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.json({ message: 'Usuario eliminado' });
});

// 📌 Editar usuario por `id`
app.put('/api/users/:id', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
    res.json({ message: 'Usuario actualizado', user: users[userIndex] });
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// 📌 Nueva ruta para obtener datos de monedas
app.get('/api/coins', (req, res) => {
  fs.readFile(path.join(__dirname, 'src/data/coinsAll.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error al leer el archivo de monedas' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// 📌 Ruta para actualizar una moneda específica
app.put('/api/coins/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const updatedCoin = req.body;

  fs.readFile(path.join(__dirname, 'src/data/coinsAll.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de monedas' });
    }

    let coins = JSON.parse(data);
    const coinIndex = coins.findIndex(coin => coin.symbol === symbol);

    if (coinIndex === -1) {
      return res.status(404).json({ error: 'Moneda no encontrada' });
    }

    // Actualizar los datos de la moneda
    coins[coinIndex] = { ...coins[coinIndex], ...updatedCoin };

    fs.writeFile(path.join(__dirname, 'src/data/coinsAll.json'), JSON.stringify(coins, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo de monedas' });
      }
      res.json({ message: 'Moneda actualizada correctamente', updatedCoin: coins[coinIndex] });
    });
  });
});

// 📌 Ruta para eliminar una moneda
app.delete('/api/coins/:symbol', (req, res) => {
  const symbol = req.params.symbol;

  fs.readFile(path.join(__dirname, 'src/data/coinsAll.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de monedas' });
    }

    let coins = JSON.parse(data);
    const coinIndex = coins.findIndex(coin => coin.symbol === symbol);

    if (coinIndex === -1) {
      return res.status(404).json({ error: 'Moneda no encontrada' });
    }

    // Eliminar la moneda del array
    coins.splice(coinIndex, 1);

    fs.writeFile(path.join(__dirname, 'src/data/coinsAll.json'), JSON.stringify(coins, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo de monedas' });
      }
      res.json({ message: 'Moneda eliminada correctamente' });
    });
  });
});

// 📌 Agregar una cuenta a un usuario
app.post('/api/users/:id/accounts', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const newAccount = req.body; // { name, balance, valuation, availableFunds }
  if (!users[userIndex].accounts) users[userIndex].accounts = [];
  users[userIndex].accounts.push(newAccount);
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.status(201).json({ message: 'Cuenta agregada', account: newAccount });
});

// 📌 Editar una cuenta de un usuario
app.put('/api/users/:id/accounts/:accountName', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const originalName = (req.body.originalName || req.params.accountName || '').toLowerCase();
  const accountIndex = users[userIndex].accounts.findIndex(
    acc => acc.name.toLowerCase() === originalName
  );

  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Cuenta no encontrada' });
  }
  users[userIndex].accounts[accountIndex] = { ...users[userIndex].accounts[accountIndex], ...req.body };
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.json({ message: 'Cuenta actualizada', account: users[userIndex].accounts[accountIndex] });
});

// 📌 Eliminar una cuenta de un usuario
app.delete('/api/users/:id/accounts/:accountName', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  users[userIndex].accounts = users[userIndex].accounts.filter(acc => acc.name !== req.params.accountName);
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.json({ message: 'Cuenta eliminada' });
});


/// 📌 Agregar un nuevo TradingBot con ID único
app.post('/api/users/:id/trading-bots', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (!users[userIndex].TradingBots) {
    users[userIndex].TradingBots = [];
  }

  const {
    timeOfInvestment,
    investment,
    totalProfit,
    transactions,
    amountPerInvestment,
    price,
    avgBuyPrice,
    bought,
    userId,
    email
  } = req.body;

  const botData = {
    id: crypto.randomUUID(), // ✅ ID único del bot
    timeOfInvestment: timeOfInvestment || null,
    investment: investment || null,
    totalProfit: totalProfit || null,
    transactions: transactions || [],
    amountPerInvestment: amountPerInvestment || null,
    price: price || null,
    avgBuyPrice: avgBuyPrice || null,
    bought: bought || null,
    userId: userId || users[userIndex].id,
    email: email || users[userIndex].email
  };

  users[userIndex].TradingBots.push(botData);

  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.status(201).json({ message: 'TradingBot agregado', TradingBots: users[userIndex].TradingBots });
});

// 📌 Obtener TradingBots de un usuario por ID
app.get('/api/users/:id/trading-bots', (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({ TradingBots: user.TradingBots || [] });
});



app.get('/api/trading-bots', (req, res) => {
  const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  // Aplanamos todos los bots de cada usuario
  const allBots = data.reduce((acc, user) => {
    if (Array.isArray(user.TradingBots)) {
      const botsWithOwner = user.TradingBots.map(bot => ({
        ...bot,
        userId: user.id,     // Aseguramos que venga el userId
        email: user.email,   // y el email
      }));
      return acc.concat(botsWithOwner);
    }
    return acc;
  }, []);
  res.json({ TradingBots: allBots });
});


// 📌 Editar un TradingBot por ID único
app.put('/api/users/:id/trading-bots/:botId', (req, res) => {
  const { id: userId, botId } = req.params;
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(userId));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const bots = users[userIndex].TradingBots || [];
  const botIndex = bots.findIndex(bot => bot.id === botId);
  if (botIndex === -1) {
    return res.status(404).json({ error: 'TradingBot no encontrado' });
  }

  users[userIndex].TradingBots[botIndex] = {
    ...users[userIndex].TradingBots[botIndex],
    ...req.body,
  };

  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.json({ message: 'TradingBot actualizado', TradingBots: users[userIndex].TradingBots });
});

// 📌 Eliminar un TradingBot por ID único
app.delete('/api/users/:id/trading-bots/:botId', (req, res) => {
  const { id: userId, botId } = req.params;
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(userId));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const bots = users[userIndex].TradingBots || [];
  const filtered = bots.filter(bot => bot.id !== botId);

  if (filtered.length === bots.length) {
    return res.status(404).json({ error: 'TradingBot no encontrado' });
  }

  users[userIndex].TradingBots = filtered;

  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.json({ message: 'TradingBot eliminado', TradingBots: users[userIndex].TradingBots });
});



// 📌 Cambiar contraseña de un usuario (validando contraseña actual en texto plano)
app.put('/api/users/:id/password', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Debes enviar currentPassword y newPassword' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
  }

  const file = fs.readFileSync(USERS_FILE, 'utf8');
  const data = JSON.parse(file);
  const userIndex = data.users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  const user = data.users[userIndex];

  if (user.password !== currentPassword) {
    return res.status(404).json({ error: 'Contraseña actual no coincide' });
  }


  if (user.password === currentPassword) {
  data.users[userIndex].password = newPassword;
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');

  res.json({ message: 'Contraseña actualizada correctamente' });
  }


});


// 📌 Guardar un nuevo NFT para un usuario
const nftStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/nft-images'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.id}-${Date.now()}${ext}`);
  }
});
const nftUpload = multer({ storage: nftStorage });

app.post('/api/users/:id/nfts', nftUpload.single('coverImage'), (req, res) => {
  let users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  if (!users[userIndex].nfts) users[userIndex].nfts = [];

  const nftData = {
    price: req.body.price,
    name: req.body.name,
    description: req.body.description,
    externalLink: req.body.externalLink,
    unlocked: req.body.unlocked === 'true',
    unlockContent: req.body.unlockContent,
    explicit: req.body.explicit === 'true',
    blockchain: req.body.blockchain,
    gestionar: req.body.gestionar,
    imageUrl: req.file ? `/nft-images/${req.file.filename}` : null,
    createdAt: new Date().toISOString(),
    author: users[userIndex].username,
    authorImage: users[userIndex].profileImage || null
  };

  users[userIndex].nfts.push(nftData);
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  res.status(201).json({ message: 'NFT creado', nft: nftData });
});

app.get('/api/users/:id/nfts', (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')).users;
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({ nfts: user.nfts || [] });
});



// Servir imágenes
app.use('/nft-images', express.static(path.join(__dirname, 'public/nft-images')));






// Servir imágenes de NFTs
app.use(
  '/profile-images',
  express.static(path.join(__dirname, 'public', 'profile-images'))
);

// Iniciar el servidor
app.listen(3002, () => {
  console.log('Servidor corriendo en http://localhost:3002');
});
