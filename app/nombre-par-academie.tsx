import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { loadLyceesWithAxios } from '../api/lyceesApi';
import { globalStyles, accentColor } from '../styles/global';

export default function NombreParAcademie() {
  const [counts, setCounts] = useState<Array<{ nom: string; n: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLyceesWithAxios()
      .then((data) => {
        const acc = { '001': 0, '024': 0, '025': 0 };
        data.forEach((l) => {
          if (acc[l.code_academie as keyof typeof acc] !== undefined) {
            acc[l.code_academie as keyof typeof acc]++;
          }
        });
        setCounts([
          { nom: 'Paris', n: acc['001'] },
          { nom: 'Créteil', n: acc['024'] },
          { nom: 'Versailles', n: acc['025'] },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[globalStyles.containerPadded, globalStyles.centered]}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={globalStyles.infoCentered}>Chargement…</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.containerPadded}>
      <Text style={globalStyles.titre}>Nombre de lycées par académie (IDF)</Text>
      {counts.map((c) => (
        <View key={c.nom} style={globalStyles.bloc}>
          <Text style={globalStyles.label}>{c.nom}</Text>
          <Text style={globalStyles.chiffre}>{c.n}</Text>
        </View>
      ))}
    </View>
  );
}
