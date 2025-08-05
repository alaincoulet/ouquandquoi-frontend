// src/pages/Activity/index.tsx
// Page de détail d'une activité (affichée à /activity/:id), 100 % clean, sans header/footer

import React, { useEffect, useState } from "react";
import Layout from '@/components/layout/Layout' // Optionnel, recommandé pour cohérence UI
import { useParams, useNavigate } from "react-router-dom";

// Interface d’activité
interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  user: string;
  image: string;
  createdAt: string;
  category?: string;
  subcategory?: string;
  website?: string;
  contactAllowed?: boolean;
  contactEmail?: string;
  isFavorite?: boolean;
}

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [favMessage, setFavMessage] = useState<string | null>(null);

  // Charge l'activité (avec état favori)
  useEffect(() => {
    fetch(`http://localhost:4000/api/activities/${id}`)
      .then((res) => res.json())
      .then((data: Activity) => {
        setActivity(data);
        setLoading(false);
      })
      .catch(() => {
        setActivity(null);
        setLoading(false);
      });
  }, [id]);

  // Toggle favori
  async function handleToggleFavorite() {
    if (!activity || favLoading) return;
    setFavLoading(true);
    setErrorMsg(null);

    const newFav = !activity.isFavorite;
    setActivity({ ...activity, isFavorite: newFav });

    try {
      const res = await fetch(`http://localhost:4000/api/activities/${activity.id}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: newFav })
      });
      if (!res.ok) throw new Error();
      setFavMessage(newFav ? "Ajouté à vos favoris !" : "Retiré des favoris.");
    } catch (err) {
      setActivity({ ...activity, isFavorite: !newFav });
      setErrorMsg("Erreur réseau : favori non modifié.");
    }
    setFavLoading(false);
    setTimeout(() => setFavMessage(null), 1800);
  }

  // Suppression activité
  async function handleDelete() {
    if (!activity) return;
    if (!window.confirm("Confirmer la suppression de cette activité ? Cette action est irréversible.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:4000/api/activities/${activity.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Activité supprimée !");
        navigate("/"); // Retour à l'accueil après suppression
      } else {
        const error = await res.json();
        alert(error.message || "Erreur lors de la suppression.");
      }
    } catch (err) {
      alert("Erreur réseau lors de la suppression !");
    }
    setDeleting(false);
  }

  if (loading) return <div className="p-8">Chargement…</div>;
  if (!activity) return <div className="p-8 text-red-500">Aucune activité trouvée pour l’id : {id}</div>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-8">
        {/* Bouton retour */}
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => window.history.back()}
        >
          ← Retour
        </button>

        {/* --- TITRE + CŒUR FAVORI --- */}
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-3xl font-bold">{activity.title}</h1>
          <button
            onClick={handleToggleFavorite}
            className="ml-2 rounded-full p-1 bg-white shadow hover:bg-yellow-100 focus:outline-none focus:ring focus:ring-yellow-300 transition"
            aria-label={activity.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            disabled={favLoading}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-7 h-7 ${activity.isFavorite ? "text-yellow-400" : "text-gray-400"} transition`}
              fill={activity.isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke={activity.isFavorite ? "currentColor" : "#a1a1aa"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C12 21 4 13.888 4 8.941A4.941 4.941 0 019 4a5.024 5.024 0 013 1.05A5.024 5.024 0 0115 4a4.941 4.941 0 015 4.941C20 13.888 12 21 12 21z"
                fill={activity.isFavorite ? "currentColor" : "none"}
              />
            </svg>
          </button>
        </div>
        {/* Feedback UX (succès/erreur) */}
        {favMessage && (
          <div className="text-green-700 text-sm mb-2">{favMessage}</div>
        )}
        {errorMsg && (
          <div className="text-red-600 text-sm mb-2">{errorMsg}</div>
        )}

        {/* Catégorie/sous-catégorie */}
        {(activity.category || activity.subcategory) && (
          <div className="mb-3 text-green-800 font-semibold flex items-center gap-2">
            <span className="inline-block px-2 py-1 rounded bg-green-100 border border-green-200">
              {activity.category}
            </span>
            {activity.subcategory && (
              <span className="inline-block px-2 py-1 rounded bg-green-50 border border-green-100">
                {activity.subcategory}
              </span>
            )}
          </div>
        )}

        {/* Image principale */}
        <img
          src={`http://localhost:4000${activity.image}`}
          alt={activity.title}
          className="w-full h-64 object-cover mb-4 rounded shadow"
          onError={(e: any) => { e.target.src = "/placeholder.jpg"; }}
        />

        {/* Description */}
        <p className="text-lg mb-2">{activity.description}</p>

        {/* --- BOUTONS ACTIONS --- */}
        <div className="flex gap-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate(`/deposer?edit=${activity.id}`)}
          >
            Modifier
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>

        {/* Localisation */}
        <div className="mb-2 text-gray-600">
          <span className="font-semibold">Lieu :</span> {activity.location}
        </div>
        {/* Utilisateur */}
        <div className="mb-2 text-gray-600">
          <span className="font-semibold">Publié par :</span> {activity.user}
        </div>
        {/* Date de création */}
        <div className="text-gray-500 text-sm">
          Ajouté le : {new Date(activity.createdAt).toLocaleString("fr-FR")}
        </div>

        {/* Site web annonceur */}
        {activity.website && (
          <div className="mt-8 border-t pt-4">
            <div className="font-semibold text-[15px] mb-1">Site web annonceur</div>
            <a
              href={activity.website.startsWith("http") ? activity.website : `https://${activity.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline break-all hover:text-green-900"
            >
              {activity.website}
            </a>
          </div>
        )}

        {/* E-mail contact si autorisé ET renseigné */}
        {activity.contactAllowed && activity.contactEmail && (
          <div className="mt-4">
            <div className="font-semibold text-[15px] mb-1">Contact annonceur</div>
            <a
              href={`mailto:${activity.contactEmail}`}
              className="text-blue-800 underline hover:text-blue-900 break-all"
            >
              {activity.contactEmail}
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
