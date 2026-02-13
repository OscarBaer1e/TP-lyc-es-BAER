import { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { LyceeItem } from '../components/LyceeItem';
import { loadLyceesWithAxios } from '../api/lyceesApi';
import { globalStyles, accentColor } from '../styles/global';

export default function LyceesCreteil() {
  const [lycees, setLycees] = useState<Array<{ code_uai?: string; nom_etablissement?: string; libelle?: string; code_postal?: string; adresse_postale?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLyceesWithAxios()
      .then((data) => setLycees(data.filter((l) => l.code_academie === '024')))
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
      ligne2={`${item.libelle} — ${item.code_postal}`}
      ligne3={item.adresse_postale}
    />
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.info}>{lycees.length} lycées — académie de Créteil</Text>
      <FlatList
        data={lycees}
        keyExtractor={(item, index) => item.code_uai ?? `key-${index}`}
        renderItem={renderItem}
        contentContainerStyle={globalStyles.list}
      />
    </View>
  );
}
