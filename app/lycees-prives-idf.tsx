import { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { LyceeItem } from '../components/LyceeItem';
import { loadLyceesWithAxios } from '../api/lyceesApi';
import { globalStyles, accentColor } from '../styles/global';

export default function LyceesPrivesIdf() {
  const [lycees, setLycees] = useState<Array<{ code_uai?: string; nom_etablissement?: string; libelle?: string; academie?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLyceesWithAxios()
      .then((data) =>
        setLycees(
          data.filter(
            (l) =>
              ['001', '024', '025'].includes(l.code_academie ?? '') && l.statut === 'privé'
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[globalStyles.container, globalStyles.centered]}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={globalStyles.infoCentered}>Chargement…</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <LyceeItem
      nom={item.nom_etablissement ?? ''}
      ligne2={`${item.libelle} — ${item.academie}`}
    />
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.info}>{lycees.length} lycées privés — région parisienne</Text>
      <FlatList
        data={lycees}
        keyExtractor={(item, index) => item.code_uai ?? `key-${index}`}
        renderItem={renderItem}
        contentContainerStyle={globalStyles.list}
      />
    </View>
  );
}
