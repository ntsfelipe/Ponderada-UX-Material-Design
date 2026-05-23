import React, { useMemo, useState } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {
  PaperProvider,
  MD3LightTheme,
  Card,
  Text,
  FAB,
  Chip,
  Checkbox,
  Snackbar,
  ProgressBar,
  Portal,
  Modal,
  TextInput,
  Button,
  Badge,
  IconButton,
  SegmentedButtons,
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';


// ======================================================
// TEMA MATERIAL DESIGN 3
// Baseado no JSON exportado do Material Theme Builder
// ======================================================

const customTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    primary: '#196B52',
    onPrimary: '#FFFFFF',

    secondary: '#4C6359',
    onSecondary: '#FFFFFF',

    tertiary: '#3F6375',

    background: '#F5FBF6',
    surface: '#F5FBF6',

    surfaceVariant: '#DBE5DE',

    onSurface: '#171D1A',
    onBackground: '#171D1A',

    outline: '#707974',

    error: '#BA1A1A',
  },
};


// ======================================================
// HÁBITOS INICIAIS
// ======================================================

const initialHabits = [
  {
    id: 1,
    title: 'Beber água',
    description: 'Tomar pelo menos 2L de água',
    time: '08:00',
    category: 'Água',
    icon: 'cup-water',
    completed: false,
  },
  {
    id: 2,
    title: 'Caminhada',
    description: '30 minutos de caminhada',
    time: '18:00',
    category: 'Exercício',
    icon: 'walk',
    completed: true,
  },
  {
    id: 3,
    title: 'Dormir cedo',
    description: 'Dormir antes das 23h',
    time: '22:00',
    category: 'Sono',
    icon: 'sleep',
    completed: false,
  },
];


// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function App() {

  // ======================================================
  // STATES
  // ======================================================

  const [habits, setHabits] = useState(initialHabits);

  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [newTitle, setNewTitle] = useState('');

  const [newDescription, setNewDescription] = useState('');

  const [newCategory, setNewCategory] = useState('');

  const [newTime, setNewTime] = useState('');

  // ======================================================
  // HUMOR
  // ======================================================

  const [mood, setMood] = useState('🙂');

  // ======================================================
  // HIDRATAÇÃO
  // ======================================================

  const [waterCount, setWaterCount] = useState(3);

  const waterGoal = 8;

  // ======================================================
  // STREAK
  // ======================================================

  const [streak, setStreak] = useState(5);


  // ======================================================
  // TOGGLE HÁBITO
  // ======================================================

  const toggleHabit = (id) => {

    const updatedHabits = habits.map((habit) => {

      if (habit.id === id) {

        const updatedHabit = {
          ...habit,
          completed: !habit.completed,
        };

        setSnackbarMessage(
          updatedHabit.completed
            ? 'Hábito concluído!'
            : 'Hábito desmarcado'
        );

        return updatedHabit;
      }

      return habit;
    });

    setHabits(updatedHabits);

    setSnackbarVisible(true);
  };


  // ======================================================
  // ADICIONAR HÁBITO
  // ======================================================

  const addHabit = () => {

    if (
      !newTitle ||
      !newDescription ||
      !newCategory ||
      !newTime
    ) {

      setSnackbarMessage(
        'Preencha todos os campos'
      );

      setSnackbarVisible(true);

      return;
    }

    const newHabit = {
      id: Date.now(),

      title: newTitle,

      description: newDescription,

      category: newCategory,

      time: newTime,

      icon: 'heart-plus',

      completed: false,
    };

    setHabits([...habits, newHabit]);

    setModalVisible(false);

    setNewTitle('');
    setNewDescription('');
    setNewCategory('');
    setNewTime('');

    setSnackbarMessage(
      'Novo hábito adicionado!'
    );

    setSnackbarVisible(true);
  };


  // ======================================================
  // HUMOR
  // ======================================================

  const handleMoodChange = (selectedMood) => {

    setMood(selectedMood);

    setSnackbarMessage(
      `Humor atualizado para ${selectedMood}`
    );

    setSnackbarVisible(true);
  };


  // ======================================================
  // HIDRATAÇÃO
  // ======================================================

  const addWaterCup = () => {

    if (waterCount < waterGoal) {

      const updatedCount = waterCount + 1;

      setWaterCount(updatedCount);

      setSnackbarMessage(
        'Você tomou +1 copo de água 💧'
      );

      setSnackbarVisible(true);

      if (updatedCount === waterGoal) {

        setStreak(streak + 1);

        setSnackbarMessage(
          'Meta de hidratação concluída 🔥'
        );
      }
    }
  };


  // ======================================================
  // REMOVER COPO
  // ======================================================

  const removeWaterCup = () => {

    if (waterCount > 0) {
      setWaterCount(waterCount - 1);
    }
  };


  // ======================================================
  // FILTRO
  // ======================================================

  const filteredHabits = useMemo(() => {

    if (selectedFilter === 'Todos') {
      return habits;
    }

    return habits.filter(
      (habit) => habit.category === selectedFilter
    );

  }, [selectedFilter, habits]);


  // ======================================================
  // PROGRESSO
  // ======================================================

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const progress = habits.length > 0
    ? completedHabits / habits.length
    : 0;


  // ======================================================
  // CORES DOS ÍCONES
  // ======================================================

  const iconColors = [
    '#196B52',
    '#3F6375',
    '#00A47E',
    '#467E98',
    '#5C7E70',
    '#008767',
    '#2B657E',
  ];


  // ======================================================
  // RENDER
  // ======================================================

  return (

    <PaperProvider theme={customTheme}>

      <SafeAreaView style={styles.container}>

        <StatusBar barStyle="dark-content" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* ======================================================
              HEADER
          ====================================================== */}

          <View style={styles.header}>

            <Text
              variant="headlineMedium"
              style={styles.greeting}
            >
              Daily Health Tracker 💊
            </Text>

            <Text
              variant="bodyLarge"
              style={styles.subtitle}
            >
              Você concluiu {completedHabits} de {habits.length} hábitos hoje
            </Text>

          </View>


          {/* ======================================================
              HUMOR DO DIA
          ====================================================== */}

          <Card style={styles.moodCard}>

            <Card.Content>

              <Text
                variant="titleMedium"
                style={styles.sectionTitle}
              >
                Humor do dia 😊
              </Text>

              <SegmentedButtons

                value={mood}

                onValueChange={handleMoodChange}

                buttons={[
                  {
                    value: '😀',
                    label: '😀',
                  },
                  {
                    value: '🙂',
                    label: '🙂',
                  },
                  {
                    value: '😐',
                    label: '😐',
                  },
                  {
                    value: '😞',
                    label: '😞',
                  },
                  {
                    value: '😫',
                    label: '😫',
                  },
                ]}
              />

              <Text style={styles.moodText}>
                Humor atual: {mood}
              </Text>

            </Card.Content>

          </Card>


          {/* ======================================================
              PROGRESSO
          ====================================================== */}

          <Card style={styles.progressCard}>

            <Card.Content>

              <View style={styles.progressHeader}>

                <Text variant="titleMedium">
                  Progresso diário
                </Text>

                <Text style={styles.progressPercentage}>
                  {Math.round(progress * 100)}%
                </Text>

              </View>

              <ProgressBar
                progress={progress}
                color={customTheme.colors.primary}
                style={styles.progressBar}
              />

            </Card.Content>

          </Card>


          {/* ======================================================
              HIDRATAÇÃO
          ====================================================== */}

          <Card style={styles.waterCard}>

            <Card.Content>

              <View style={styles.waterHeader}>

                <Text variant="titleMedium">
                  Hidratação 💧
                </Text>

                <Text style={styles.waterCount}>
                  {waterCount}/{waterGoal}
                </Text>

              </View>

              <ProgressBar
                progress={waterCount / waterGoal}
                style={styles.progressBar}
                color="#00A47E"
              />

              <View style={styles.waterButtons}>

                <IconButton
                  icon="minus-circle-outline"
                  size={30}
                  iconColor="#196B52"
                  onPress={removeWaterCup}
                />

                <Button
                  mode="contained"
                  onPress={addWaterCup}
                >
                  +1 copo
                </Button>

                <IconButton
                  icon="plus-circle-outline"
                  size={30}
                  iconColor="#196B52"
                  onPress={addWaterCup}
                />

              </View>

            </Card.Content>

          </Card>


          {/* ======================================================
              STREAK
          ====================================================== */}

          <Card style={styles.streakCard}>

            <Card.Content>

              <View style={styles.streakContainer}>

                <View>

                  <Text variant="titleMedium">
                    Mini Health Streak 🔥
                  </Text>

                  <Text style={styles.streakSubtitle}>
                    Você está mantendo sua sequência!
                  </Text>

                </View>

                <Badge
                  size={42}
                  style={styles.streakBadge}
                >
                  {streak}
                </Badge>

              </View>

            </Card.Content>

          </Card>


          {/* ======================================================
              CHIPS
          ====================================================== */}

          <Text
            variant="titleMedium"
            style={styles.sectionTitle}
          >
            Categorias
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipContainer}
          >

            {[
              'Todos',
              'Saúde',
              'Água',
              'Exercício',
              'Sono',
            ].map((category) => (

              <Chip
                key={category}

                selected={selectedFilter === category}

                onPress={() =>
                  setSelectedFilter(category)
                }

                style={styles.chip}

                showSelectedCheck

                selectedColor={customTheme.colors.primary}

                accessibilityLabel={`Filtrar ${category}`}

                accessibilityRole="button"
              >
                {category}
              </Chip>

            ))}

          </ScrollView>


          {/* ======================================================
              LISTA DE HÁBITOS
          ====================================================== */}

          <Text
            variant="titleMedium"
            style={styles.sectionTitle}
          >
            Seus hábitos
          </Text>

          {filteredHabits.map((habit) => (

            <Card
              key={habit.id}
              style={[
                styles.habitCard,
                habit.completed && styles.completedCard
              ]}
            >

              <Card.Content>

                <View style={styles.habitRow}>

                  <View style={styles.iconContainer}>

                    <MaterialCommunityIcons
                      name={habit.icon}
                      size={28}
                      color={
                        iconColors[
                          habit.id % iconColors.length
                        ]
                      }
                    />

                  </View>

                  <View style={styles.habitContent}>

                    <Text
                      variant="titleMedium"
                      style={[
                        styles.habitTitle,
                        habit.completed &&
                        styles.completedText
                      ]}
                    >
                      {habit.title}
                    </Text>

                    <Text
                      variant="bodyMedium"
                      style={styles.habitDescription}
                    >
                      {habit.description}
                    </Text>

                    <Text
                      variant="labelMedium"
                      style={styles.habitTime}
                    >
                      Horário: {habit.time}
                    </Text>

                  </View>

                  <Checkbox
                    status={
                      habit.completed
                        ? 'checked'
                        : 'unchecked'
                    }

                    onPress={() =>
                      toggleHabit(habit.id)
                    }

                    color={customTheme.colors.primary}

                    accessibilityLabel={`Marcar ${habit.title}`}

                    accessibilityRole="checkbox"
                  />

                </View>

              </Card.Content>

            </Card>

          ))}

        </ScrollView>


        {/* ======================================================
            FAB
        ====================================================== */}

        <FAB
          icon="plus"

          style={styles.fab}

          onPress={() =>
            setModalVisible(true)
          }

          accessibilityLabel="Adicionar hábito"

          accessibilityRole="button"
        />


        {/* ======================================================
            MODAL
        ====================================================== */}

        <Portal>

          <Modal
            visible={modalVisible}

            onDismiss={() =>
              setModalVisible(false)
            }

            contentContainerStyle={styles.modal}
          >

            <Text
              variant="headlineSmall"
              style={styles.modalTitle}
            >
              Novo hábito
            </Text>

            <TextInput
              label="Título"
              value={newTitle}
              onChangeText={setNewTitle}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Descrição"
              value={newDescription}
              onChangeText={setNewDescription}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Categoria"
              value={newCategory}
              onChangeText={setNewCategory}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Horário"
              value={newTime}
              onChangeText={setNewTime}
              mode="outlined"
              placeholder="08:00"
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={addHabit}
              style={styles.addButton}
            >
              Adicionar hábito
            </Button>

          </Modal>

        </Portal>


        {/* ======================================================
            SNACKBAR
        ====================================================== */}

        <Snackbar
          visible={snackbarVisible}

          onDismiss={() =>
            setSnackbarVisible(false)
          }

          duration={2500}

          action={{
            label: 'OK',
            onPress: () => {},
          }}
        >
          {snackbarMessage}
        </Snackbar>

      </SafeAreaView>

    </PaperProvider>
  );
}


// ======================================================
// ESTILOS
// ======================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5FBF6',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    marginBottom: 24,
  },

  greeting: {
    fontWeight: '700',
    color: '#171D1A',
  },

  subtitle: {
    marginTop: 8,
    color: '#4C6359',
  },

  sectionTitle: {
    marginBottom: 14,
    fontWeight: '700',
    color: '#171D1A',
  },

  moodCard: {
    borderRadius: 24,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },

  moodText: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#196B52',
  },

  progressCard: {
    borderRadius: 24,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  progressPercentage: {
    color: '#196B52',
    fontWeight: '700',
    fontSize: 18,
  },

  progressBar: {
    height: 10,
    borderRadius: 20,
  },

  waterCard: {
    borderRadius: 24,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },

  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  waterCount: {
    fontWeight: '700',
    color: '#00A47E',
  },

  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },

  streakCard: {
    borderRadius: 24,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },

  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  streakSubtitle: {
    marginTop: 6,
    color: '#4C6359',
  },

  streakBadge: {
    backgroundColor: '#196B52',
  },

  chipContainer: {
    paddingBottom: 16,
  },

  chip: {
    marginRight: 10,
    borderRadius: 24,
    backgroundColor: '#E9F3EC',
  },

  habitCard: {
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },

  completedCard: {
    opacity: 0.7,
  },

  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#E9F3EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  habitContent: {
    flex: 1,
  },

  habitTitle: {
    fontWeight: '700',
    color: '#171D1A',
  },

  completedText: {
    textDecorationLine: 'line-through',
  },

  habitDescription: {
    marginTop: 4,
    color: '#4C6359',
  },

  habitTime: {
    marginTop: 8,
    color: '#196B52',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 20,
    backgroundColor: '#196B52',
  },

  modal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 28,
  },

  modalTitle: {
    marginBottom: 20,
    fontWeight: '700',
    color: '#171D1A',
  },

  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  addButton: {
    marginTop: 10,
    borderRadius: 14,
  },

});