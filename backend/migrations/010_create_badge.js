exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS badge (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      description TEXT NULL,
      image TEXT NULL,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )
  `);

  pgm.sql(`
    INSERT INTO badge (label, description, image)
    VALUES
      (
        'L''Explorateur Gastronomique',
        'Motivation : découvrir des expériences uniques\nComportement : teste des restaurants étoilés dans plusieurs villes/pays\nRapport au Michelin : guide de référence absolue\nBudget : élevé\nAttente : surprise, créativité, signature chef',
        null
      ),
      (
        'Le Célébrateur',
        'Motivation : marquer une occasion (anniversaire, date, succès)\nComportement : réservation ponctuelle\nRapport au Michelin : symbole de prestige\nBudget : élevé mais occasionnel\nAttente : moment mémorable + service impeccable',
        null
      ),
      (
        'Le Statutaire',
        'Motivation : image sociale, impressionner\nComportement : choisit les restaurants les plus prestigieux\nRapport au Michelin : label de statut\nBudget : élevé\nAttente : reconnaissance sociale, lieu iconique',
        null
      ),
      (
        'Le Curieux Accessible',
        'Motivation : découvrir sans se ruiner\nComportement : cherche Bib Gourmand ou bons plans\nRapport au Michelin : filtre qualité/prix\nBudget : moyen\nAttente : bonne surprise, rapport qualité/prix',
        null
      ),
      (
        'Le Local Fidèle',
        'Motivation : bien manger près de chez lui\nComportement : revient souvent dans les mêmes adresses\nRapport au Michelin : validation de choix locaux\nBudget : variable\nAttente : constance, qualité régulière',
        null
      ),
      (
        'Le Touriste Guidé',
        'Motivation : éviter les mauvaises surprises en voyage\nComportement : suit Michelin dans une ville inconnue\nRapport au Michelin : outil de confiance\nBudget : moyen à élevé\nAttente : authenticité + sécurité',
        null
      ),
      (
        'Le Digital Foodie',
        'Motivation : contenu, partage, tendance\nComportement : choisit aussi pour Instagram/TikTok\nRapport au Michelin : parfois jugé "trop classique"\nBudget : variable\nAttente : visuel, storytelling, nouveauté',
        null
      ),
      (
        'Le Responsable',
        'Motivation : impact environnemental et éthique\nComportement : privilégie les restaurants durables (étoile verte)\nRapport au Michelin : en évolution\nBudget : moyen à élevé\nAttente : transparence, sourcing, valeurs',
        null
      )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE badge`);
};
