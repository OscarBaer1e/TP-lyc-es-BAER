import { Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

type Props = {
  nom: string;
  ligne2: string;
  ligne3?: string;
};

export function LyceeItem({ nom, ligne2, ligne3 }: Props) {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardNom}>{nom}</Text>
      <Text style={globalStyles.cardLigne2}>{ligne2}</Text>
      {ligne3 ? <Text style={globalStyles.cardLigne3}>{ligne3}</Text> : null}
    </View>
  );
}
