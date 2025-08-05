// src/components/activities/ActivityForm.tsx
// Formulaire de dépôt/modification d'activité
// - Edition : pré-remplissage des champs si ?edit=ID dans l’URL
// - Glisser-déposer OU bouton parcourir image
// - Recadrage image au ratio A4 via react-easy-crop
// - Preview de l’image recadrée
// - Envoi de l’image cropée côté backend
// - Validation stricte du champ “Quand ?” (obligatoire)

import React, { useState, DragEvent, FormEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IconButton from '@/components/atoms/IconButton'
import { MapPinIcon, CalendarIcon, KeyIcon } from '@heroicons/react/24/solid'
import { FilterWherePanel } from "@/components/molecules/filters/FilterWherePanel";
import { FilterWhenPanel } from '@/components/molecules/filters/FilterWhenPanel'
import { FilterWhatPanel } from '@/components/molecules/filters/FilterWhatPanel'
import { CATEGORIES } from '@/utils/categories'
import ImageCropperA4 from './ImageCropperA4'

const mockUser = {
  name: "Alain",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
};

export default function ActivityForm() {
  // --- Etape 2 : récupération paramètre edit ---
  const locationRoute = useLocation();
  const searchParams = new URLSearchParams(locationRoute.search);
  const editId = searchParams.get('edit'); // string ou null

  // États principaux du formulaire
  const [dragActive, setDragActive] = useState(false);
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);        // Image sélectionnée (base64 ou url)
  const [croppedImage, setCroppedImage] = useState<string | null>(null); // Image recadrée, prêt à l’envoi
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [contactAllowed, setContactAllowed] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [location, setLocation] = useState("");
  const [when, setWhen] = useState('Quand ?');
  const [showWherePanel, setShowWherePanel] = useState(false);
  const [showWhenPanel, setShowWhenPanel] = useState(false);
  const [showWhatPanel, setShowWhatPanel] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // --- Etape 2 bis : si édition, charger l’activité ---
  useEffect(() => {
    if (!editId) return;
    fetch(`http://localhost:4000/api/activities/${editId}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then(activity => {
        setTitle(activity.title || "");
        setCategory(activity.category || "");
        setSubcategory(activity.subcategory || "");
        setDescription(activity.description || "");
        setWebsite(activity.website || "");
        setContactAllowed(activity.contactAllowed || false);
        setContactEmail(activity.contactEmail || "");
        setLocation(activity.location || "");
        setWhen(activity.when || "Quand ?");
        // Image : affichage en preview, recrop possible si besoin
        if (activity.image) {
          setDroppedFile(null);
          setCroppedImage(null); // reset tout crop précédent
          setImageSrc(activity.image);
        }
      })
      .catch(() => {
        setError("Impossible de charger l’activité à modifier !");
      });
  }, [editId]);

  // Gestion drag & drop image
  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }
  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  }
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setDroppedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImageSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
      setCroppedImage(null); // reset crop si nouvelle image
    }
  }
  // Gestion sélection fichier via explorateur
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setDroppedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImageSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
      setCroppedImage(null); // reset crop si nouvelle image
    }
  }

  // Soumission du formulaire
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    // Validation stricte des champs obligatoires
    if (!title.trim()) { setError("Le titre est obligatoire !"); return; }
    if (!category) { setError("La catégorie est obligatoire !"); return; }
    if (!subcategory) { setError("La sous-catégorie est obligatoire !"); return; }
    if (!location.trim()) { setError("La localisation est obligatoire !"); return; }
    // Validation “Quand ?” obligatoire
    if (!when || when === "Quand ?" || !when.trim()) {
      setError("La date ou période (champ 'Quand') est obligatoire !");
      return;
    }
    if (contactAllowed && !contactEmail.trim()) {
      setError("Merci de saisir une adresse e-mail pour être contacté."); return;
    }
    // Construction des données à envoyer
    const activity = {
      title, description, location, when,
      user: mockUser.name, category, subcategory, website,
      contactAllowed, contactEmail: contactAllowed ? contactEmail : "",
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(activity));
    // 🔥 Ajout de l’image recadrée OU image brute
    if (croppedImage) {
      // Convertit le base64 en blob
      const byteString = atob(croppedImage.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: 'image/jpeg' });
      formData.append("image", blob, "cropped.jpg");
    } else if (droppedFile) {
      formData.append("image", droppedFile);
    }
    // --- Etape 2 ter : méthode PATCH si édition, POST sinon ---
    const url = editId
      ? `http://localhost:4000/api/activities/${editId}`
      : "http://localhost:4000/api/activities";
    const method = editId ? "PATCH" : "POST";
    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData && errorData.message ? errorData.message : "Erreur lors de l'envoi de l'activité";
        setError(msg); alert(msg); return;
      }
      alert(editId ? "Activité modifiée !" : "Activité enregistrée !");
      navigate("/");
    } catch (err: any) {
      setError("Erreur réseau lors de l'envoi de l'activité"); alert("Erreur réseau lors de l'envoi de l'activité !");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#FDF7F1] px-0 py-0">
      {/* Bandeau de titre + bouton fermer */}
      <div className="w-full max-w-md bg-[#FDF7F1] rounded-t-xl flex items-center border-b border-[#F3E4D6] px-2 py-3 mx-auto">
        <div className="flex-1 text-center text-lg font-semibold">
          {editId ? "Modifier une activité" : "Déposer une activité"}
        </div>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#e3d7c9] text-2xl ml-2"
          aria-label="Fermer"
          onClick={() => navigate("/")}
          type="button"
        >&#10005;</button>
      </div>
      {/* Formulaire principal */}
      <form
        className="w-full max-w-md bg-white rounded-b-xl border-x border-b border-[#F3E4D6] flex flex-col"
        onSubmit={handleSubmit}
      >
        {/* Colonne boutons "Où, Quand, Quoi" + Drag & Drop */}
        <div className="flex flex-row w-full gap-2 p-0 bg-white relative">
          <div className="flex flex-col gap-2 mt-4 ml-4">
            {/* Où ? */}
            <div className="relative">
              <IconButton
                label={location ? location : "Où ?"}
                icon={<MapPinIcon className="w-5 h-5" />}
                isActive={showWherePanel}
                onClick={() => setShowWherePanel((v) => !v)}
              />
              {showWherePanel && (
                <div className="absolute left-36 top-0 z-30">
                  <FilterWherePanel
                    value={location}
                    onChange={(val) => setLocation(val)}
                    onClose={() => setShowWherePanel(false)}
                    hideDistance={true}
                  />
                </div>
              )}
            </div>
            {/* Quand ? */}
            <div className="relative">
              <IconButton
                label={when}
                icon={<CalendarIcon className="w-5 h-5" />}
                isActive={showWhenPanel}
                onClick={() => setShowWhenPanel((v) => !v)}
              />
              {showWhenPanel && (
                <div className="absolute left-36 top-0 z-30">
                  <FilterWhenPanel
                    value={when}
                    onChange={(val) => setWhen(val)}
                    onClose={() => setShowWhenPanel(false)}
                  />
                </div>
              )}
            </div>
            {/* Quoi ? */}
            <div className="relative">
              <IconButton
                label={title ? title : "Quoi ?"}
                icon={<KeyIcon className="w-5 h-5" />}
                isActive={showWhatPanel}
                onClick={() => setShowWhatPanel((v) => !v)}
              />
              {showWhatPanel && (
                <div className="absolute left-36 top-0 z-30">
                  <FilterWhatPanel
                    value={{ keyword: title }}
                    onChange={(val) => setTitle(val.keyword)}
                    onClose={() => setShowWhatPanel(false)}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Drag & drop ou bouton parcourir image */}
          <div
            className={`flex-1 flex flex-col items-center justify-center mt-4 mr-4 ml-2 min-h-[80px] max-h-[120px] rounded-lg border border-dashed border-[#B9B6B3] bg-white text-[13px] text-[#4B463E] text-center px-2 py-2 ${dragActive ? "border-[#5FA568] bg-green-50" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ minWidth: 130, maxWidth: 180 }}
          >
            {/* Aperçu image recadrée */}
            {croppedImage && (
              <img src={croppedImage} alt="Aperçu recadré" className="max-h-28 mx-auto mb-1 rounded" />
            )}
            {/* Si pas d’image sélectionnée, propose drag & drop ou parcourir */}
            {!droppedFile && (
              <>
                <span>
                  Glissez-déposez<br />logo, affiche, programme
                </span>
                <label className="block mt-2 text-blue-700 underline cursor-pointer">
                  Parcourir
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </>
            )}
            {/* Si image sélectionnée, affiche le nom */}
            {droppedFile && !croppedImage && (
              <div>
                <span className="block font-bold mb-1">Fichier sélectionné :</span>
                <span>{droppedFile.name}</span>
              </div>
            )}
          </div>
        </div>
        {/* CROP IMAGE après sélection */}
        {imageSrc && !croppedImage && (
          <div className="my-3">
            <ImageCropperA4
              imageSrc={imageSrc}
              onCropComplete={(croppedImg) => setCroppedImage(croppedImg)}
            />
          </div>
        )}
        {/* Champs texte */}
        <div className="flex flex-col gap-1 px-4 mt-2 mb-1 bg-white">
          <div className="mb-1">
            <span className="font-semibold text-[15px]">Titre :</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l’activité"
              className="input"
            />
          </div>
          {/* Sélection catégorie & sous-catégorie */}
          <div className="mb-1">
            <span className="font-semibold text-[15px]">Catégorie :</span>
            <select
              value={category}
              onChange={e => {
                setCategory(e.target.value)
                setSubcategory("")
              }}
              className="input"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {CATEGORIES.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <span className="font-semibold text-[15px]">Sous-catégorie :</span>
            <select
              value={subcategory}
              onChange={e => setSubcategory(e.target.value)}
              className="input"
              required
              disabled={!category}
            >
              <option value="">Sélectionnez une sous-catégorie</option>
              {category && CATEGORIES.find(cat => cat.name === category)?.sub.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <span className="font-semibold text-[15px]">Description :</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre activité"
              className="input h-28 resize-none"
            />
          </div>
          {/* 🟢 Champ site web (optionnel) */}
          <div className="mb-1">
            <span className="font-semibold text-[15px]">Site web (optionnel)&nbsp;:</span>
            <input
              type="url"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="https://www.monsite.fr"
              className="input"
            />
          </div>
          {/* 🟢 Contact : accepter d'être contacté par les visiteurs */}
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="contactAllowed"
              checked={contactAllowed}
              onChange={e => {
                setContactAllowed(e.target.checked);
                if (!e.target.checked) setContactEmail("");
              }}
              className="mr-2"
            />
            <label htmlFor="contactAllowed" className="select-none">
              J’accepte d’être contacté par les visiteurs du site oùquandquoi.fr
            </label>
          </div>
          {/* 🟢 Champ e-mail conditionnel */}
          {contactAllowed && (
            <div className="mb-1">
              <span className="font-semibold text-[15px]">E-mail pour être contacté :</span>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="adresse@email.fr"
                className="input"
                autoFocus
              />
            </div>
          )}
          {/* Affiche une erreur globale si besoin */}
          {error && (
            <div className="text-red-600 text-xs mt-1">{error}</div>
          )}
        </div>
        {/* Profil utilisateur */}
        <div className="flex items-center bg-white border-t border-[#E3DFDC] px-4 py-3 gap-3">
          <img src={mockUser.avatar} alt={mockUser.name} className="w-9 h-9 rounded-full border" />
          <div>
            <div className="font-semibold text-[15px] text-[#3C3834]">{mockUser.name}</div>
            <div className="text-xs text-[#B9B6B3]">Mes activités, profil</div>
          </div>
          <div className="ml-auto text-xl text-[#B9B6B3]">&gt;</div>
        </div>
        {/* Bouton envoyer */}
        <div className="px-4 py-4">
          <button type="submit" className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold text-base hover:bg-green-700 transition">
            {editId ? "Enregistrer les modifications" : "Publier l’activité"}
          </button>
        </div>
        <div className="text-xs text-[#B9B6B3] text-center py-2">oùquandquoi, 2025</div>
      </form>
    </div>
  );
}
