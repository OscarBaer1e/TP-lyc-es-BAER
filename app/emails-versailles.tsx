import { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { LyceeItem } from '../components/LyceeItem';
import { loadLyceesWithAxios } from '../api/lyceesApi';
import { globalStyles, accentColor } from '../styles/global';

export default function EmailsVersailles() {
  const [lycees, setLycees] = useState<Array<{ code_uai?: string; nom_etablissement?: string; mail?: string | null }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLyceesWithAxios()
      .then((data) => setLycees(data.filter((l) => l.code_academie === '025' && l.mail)))
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
    <LyceeItem nom={item.nom_etablissement ?? ''} ligne2={item.mail ?? ''} />
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.info}>{lycees.length} lycées avec mail — académie Versailles</Text>
      <FlatList
        data={lycees}
        keyExtractor={(item, index) => item.code_uai ?? `key-${index}`}
        renderItem={renderItem}
        contentContainerStyle={globalStyles.list}
      />
    </View>
  );
}
