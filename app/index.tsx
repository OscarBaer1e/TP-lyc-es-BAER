import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Accueil() {
  return (
    <ScrollView style={globalStyles.accueilScroll} contentContainerStyle={globalStyles.accueilContent}>
      <Image source={require('../assets/logo-uge.png')} style={globalStyles.accueilLogo} resizeMode="contain" />
      <Text style={globalStyles.accueilTitre}>Lycée App</Text>
      <Text style={globalStyles.accueilAuteur}>Oscar Baer</Text>

      <View style={globalStyles.accueilBouton}>
        <Link href="/lycees-creteil" style={globalStyles.accueilTexteBouton}>
          Lycées académie Créteil
        </Link>
      </View>
      <View style={globalStyles.accueilBouton}>
        <Link href="/lycees-prives-idf" style={globalStyles.accueilTexteBouton}>
          Lycées privés région parisienne
        </Link>
      </View>
      <View style={globalStyles.accueilBouton}>
        <Link href="/types-lycees" style={globalStyles.accueilTexteBouton}>
          Nombre par type (LP PR, LPO, LGT)
        </Link>
      </View>
      <View style={globalStyles.accueilBouton}>
        <Link href="/emails-versailles" style={globalStyles.accueilTexteBouton}>
          Mails lycées Versailles
        </Link>
      </View>
      <View style={globalStyles.accueilBouton}>
        <Link href="/nombre-par-academie" style={globalStyles.accueilTexteBouton}>
          Nombre par académie IDF
        </Link>
      </View>
    </ScrollView>
  );
}
