import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, MapPin, Mail, Facebook, Instagram, Navigation, ShoppingBag, Calendar, Cake, Coffee, Sandwich, Pizza, MessageSquare } from 'lucide-react';
import ReviewsWidget from './ReviewsWidget'; // Importez le nouveau composant

// Types de produits disponibles
const productCategories = [
  { id: 'patisserie', name: 'Pâtisseries', icon: <Cake className="w-5 h-5" /> },
  { id: 'viennoiserie', name: 'Viennoiseries', icon: <Coffee className="w-5 h-5" /> },
  { id: 'sandwich', name: 'Sandwiches', icon: <Sandwich className="w-5 h-5" /> },
  { id: 'special', name: 'Spécialités', icon: <Pizza className="w-5 h-5" /> }
];

// Options de retrait
const pickupOptions = [
  { id: 'today', name: 'Aujourd\'hui' },
  { id: 'tomorrow', name: 'Demain' },
  { id: 'custom', name: 'Date spécifique' }
];

const Contact = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState('');
  const [pickupOption, setPickupOption] = useState('today');
  const [customDate, setCustomDate] = useState('');
  const [note, setNote] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  // Formatter le message pour WhatsApp
  const formatWhatsAppMessage = () => {
    const categoryText = selectedCategory ? `*Catégorie:* ${productCategories.find(c => c.id === selectedCategory)?.name}\n` : '';
    const detailsText = orderDetails ? `*Détails de la commande:* ${orderDetails}\n` : '';
    const pickupText = pickupOption === 'custom' && customDate 
      ? `*Date de retrait souhaitée:* ${customDate}\n`
      : `*Retrait:* ${pickupOptions.find(p => p.id === pickupOption)?.name}\n`;
    const noteText = note ? `*Note supplémentaire:* ${note}` : '';
    
    return encodeURIComponent(`Bonjour Pain Patisserie, je souhaite passer une commande:\n\n${categoryText}${detailsText}${pickupText}${noteText}`);
  };
  
  // Générer le lien WhatsApp
  const generateWhatsAppLink = () => {
    // Remplacer par le vrai numéro de téléphone au format international
    const phoneNumber = "+32472250578";
    return `https://wa.me/${phoneNumber}?text=${formatWhatsAppMessage()}`;
  };

  return (
    <section id="contact" className="py-20 bg-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-gold/5 to-transparent blur-2xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair text-chocolate mb-4">Contactez-nous</h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
          <p className="text-chocolate-light max-w-2xl mx-auto">
            Une question, une commande spéciale ou simplement envie de nous dire bonjour ?
            N'hésitez pas à nous contacter.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Map */}
              <div className="h-64 bg-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8601043774498!2d4.406505776878711!3d50.867813198846275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c31cc226b111%3A0xa4fb9a85afdd6fea!2sChau.%20de%20Louvain%20906%2C%201140%20Evere%2C%20Belgique!5e0!3m2!1sfr!2s!4v1718465132057!5m2!1sfr!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Plan d'accès Pain Patisserie"
                />
              </div>
              
              {/* Contact details */}
              <div className="p-8">
                <h3 className="text-xl font-playfair text-chocolate mb-6">Informations</h3>
                
                <div className="space-y-6">
                  {/* Address with Waze */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <MapPin className="text-gold w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-chocolate mb-1">Adresse</h4>
                      <p className="text-chocolate-light mb-2">
                        Chaussée de Louvain 906<br />
                        1140 Evere, Belgique
                      </p>
                      <div className="flex space-x-2">
                        <a 
                          href="https://waze.com/ul?ll=50.867813,4.4086958&navigate=yes" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 bg-[#33ccff] text-white text-sm rounded-md hover:bg-[#33bbee] transition-colors"
                        >
                          <Navigation className="w-4 h-4 mr-1" /> 
                          Waze
                        </a>
                        <a 
                          href="https://www.google.com/maps/dir/?api=1&destination=Chaussée+de+Louvain+906,+1140+Evere,+Belgique" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 bg-[#4285F4] text-white text-sm rounded-md hover:bg-[#3367D6] transition-colors"
                        >
                          <MapPin className="w-4 h-4 mr-1" /> 
                          Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Phone className="text-gold w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-chocolate mb-1">Téléphone</h4>
                      <p className="text-chocolate-light">
                        <a 
                          href="tel:+32472250578" 
                          className="hover:text-gold transition-colors"
                        >
                          0472 25 05 78
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Mail className="text-gold w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-chocolate mb-1">Email</h4>
                      <p className="text-chocolate-light">
                        <a 
                          href="mailto:contact@painpatisserie.be" 
                          className="hover:text-gold transition-colors"
                        >
                          contact@painpatisserie.be
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Clock className="text-gold w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-chocolate mb-1">Horaires d'ouverture</h4>
                      <ul className="text-chocolate-light space-y-1">
                        <li className="flex justify-between">
                          <span>Lundi</span>
                          <span>06:00 - 20:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Mardi</span>
                          <span className="text-red-500 font-medium">Fermé</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Mercredi</span>
                          <span>06:00 - 20:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Jeudi</span>
                          <span>06:00 - 20:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Vendredi</span>
                          <span>06:00 - 20:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Samedi</span>
                          <span>06:00 - 20:00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Dimanche</span>
                          <span>06:00 - 20:00</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-chocolate mb-3">Suivez-nous</h4>
                    <div className="flex space-x-4">
                      <a 
                        href="https://www.facebook.com/painpatisserie/?locale=fr_FR" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://www.instagram.com/painpatisserie/?hl=fr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a 
                        href={`https://wa.me/32472250578`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="WhatsApp"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Widget d'avis Google - Remplace le témoignage simulé */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-chocolate mb-3 flex items-center">
                      <svg viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                        <path fill="#4285F4" d="M12 11h6.55c.23 1.05.43 2.07.43 3.39 0 4.14-3 7.61-6.98 7.61s-7-3.47-7-7.61c0-4.14 3.02-7.39 7-7.39.47 0 1.09.12 1.55.22L16.17 4.6c-1.06-.64-2.75-1.09-4.17-1.09C6.52 3.51 2 8.03 2 13.99s4.52 10.49 10 10.49c5.23 0 9.48-3.79 9.97-9.01l.53-6.27h-9.99L12 11z"/>
                      </svg>
                      Ils parlent de nous
                    </h4>
                    
                    {/* Intégration du widget d'avis */}
                    <div className="bg-cream rounded-lg border border-gold/20 p-1">
                      <ReviewsWidget />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* WhatsApp Order Form - Innovative Design */}
          <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gold p-4">
                <h3 className="text-xl font-playfair text-white flex items-center">
                  <ShoppingBag className="mr-2" /> 
                  Commander via WhatsApp
                </h3>
              </div>
              
              <div className="p-8">
                <p className="text-chocolate-light mb-6">
                  Passez votre commande en quelques clics ! Sélectionnez vos produits, 
                  indiquez vos préférences et envoyez directement votre demande via WhatsApp.
                </p>
                
                {/* Step 1: Select category */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-chocolate mb-3 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-gold text-white text-xs flex items-center justify-center mr-2">1</span>
                    Choisissez une catégorie
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {productCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                          selectedCategory === category.id
                            ? 'bg-gold/20 border border-gold text-chocolate'
                            : 'bg-gray-50 border border-gray-200 text-chocolate-light hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Step 2: Order details */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-chocolate mb-3 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-gold text-white text-xs flex items-center justify-center mr-2">2</span>
                    Détails de votre commande
                  </h4>
                  
                  <textarea
                    value={orderDetails}
                    onChange={(e) => setOrderDetails(e.target.value)}
                    placeholder="Ex: 2 Paris-Brest, 1 gâteau au chocolat pour 6 personnes..."
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-gold"
                    rows={3}
                  />
                </div>
                
                {/* Step 3: Pickup options */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-chocolate mb-3 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-gold text-white text-xs flex items-center justify-center mr-2">3</span>
                    Date de retrait souhaitée
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {pickupOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setPickupOption(option.id)}
                        className={`p-2 rounded-lg text-center transition-all ${
                          pickupOption === option.id
                            ? 'bg-gold/20 border border-gold text-chocolate'
                            : 'bg-gray-50 border border-gray-200 text-chocolate-light hover:bg-gray-100'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                  
                  {pickupOption === 'custom' && (
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-gold"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  )}
                </div>
                
                {/* Step 4: Additional notes */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-chocolate mb-3 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-gold text-white text-xs flex items-center justify-center mr-2">4</span>
                    Note supplémentaire (optionnel)
                  </h4>
                  
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Allergies, préférences, heure de retrait..."
                    className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-gold"
                  />
                </div>
                
                {/* Preview and Order buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 border border-chocolate text-chocolate hover:bg-chocolate/5 transition-colors flex-1 flex items-center justify-center"
                  >
                    <MessageSquare className="mr-2 w-4 h-4" />
                    {showPreview ? 'Masquer l\'aperçu' : 'Voir l\'aperçu'}
                  </button>
                  
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-[#25D366] hover:bg-[#20BD5C] text-white transition-colors flex-1 flex items-center justify-center rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Commander sur WhatsApp
                  </a>
                </div>
                
                {/* Message preview */}
                {showPreview && (
                  <motion.div 
                    className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <h5 className="text-sm font-semibold text-chocolate mb-2">Aperçu du message</h5>
                    <div className="p-3 bg-[#DCF8C6] rounded-lg text-sm text-gray-700 whitespace-pre-line">
                      {decodeURIComponent(formatWhatsAppMessage()).replace(/\*/g, '')}
                    </div>
                  </motion.div>
                )}
                
                {/* WhatsApp explanation */}
                <div className="mt-6 text-xs text-chocolate-light/70 text-center">
                  En cliquant sur "Commander sur WhatsApp", vous serez redirigé vers l'application WhatsApp 
                  avec un message pré-rempli. Vous pourrez modifier ce message avant de l'envoyer.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
