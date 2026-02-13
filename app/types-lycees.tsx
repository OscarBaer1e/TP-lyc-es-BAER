import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { loadLyceesWithAxios } from '../api/lyceesApi';
import { globalStyles, accentColor } from '../styles/global';

export default function TypesLycees() {
  const [counts, setCounts] = useState({ 'LP PR': 0, LPO: 0, LGT: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLyceesWithAxios()
      .then((data) => {
        const acc = { 'LP PR': 0, LPO: 0, LGT: 0 };
        data.forEach((l) => {
          if (l.sigle_uai === 'LP PR' || l.sigle_uai === 'LPO' || l.sigle_uai === 'LGT') {
            acc[l.sigle_uai]++;
          }
        });
        setCounts(acc);
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
      <Text style={globalStyles.titre}>Nombre de lycées par type</Text>
      <View style={globalStyles.bloc}>
        <Text style={globalStyles.label}>LP PR</Text>
        <Text style={globalStyles.chiffre}>{counts['LP PR']}</Text>
      </View>
      <View style={globalStyles.bloc}>
        <Text style={globalStyles.label}>LPO</Text>
        <Text style={globalStyles.chiffre}>{counts.LPO}</Text>
      </View>
      <View style={globalStyles.bloc}>
        <Text style={globalStyles.label}>LGT</Text>
        <Text style={globalStyles.chiffre}>{counts.LGT}</Text>
      </View>
    </View>
  );
}
