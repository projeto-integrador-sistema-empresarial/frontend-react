import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { formatDate } from '../utils/formatDate';

interface Training {
  _id: string;
  name: string;
  cod: string;
  desc: string;
  workload: string;
  enroll_start: string;
  enroll_end: string;
  min_students: string;
  max_students: string;
  training_start: string;
  training_end: string;
  created_by: string;
  enrolled: boolean;
  all_questions: string[];
}

export function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    api.get('/api/trainings')
      .then((response) => {
        setTrainings(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEnroll = (training: Training) => {
    if (training.enrolled) {
      // Desinscrever
      api.delete('/api/trainings/unenroll', {
        data: { cod: training.cod },
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          if (res.status === 204) {
            // Atualizar estado do treinamento para não inscrito
            setTrainings((prevTrainings) =>
              prevTrainings.map((prevTraining) =>
                prevTraining._id === training._id ? { ...prevTraining, enrolled: false } : prevTraining
              )
            );
          }
        })
        .catch((error) => console.log(error));
    } else {
      // Verificar se já está inscrito
      enrolledTrainings({ cod: training.cod })
        .then((enrolled) => {
          if (enrolled) {
            // Atualizar estado do treinamento para inscrito
            setTrainings((prevTrainings) =>
              prevTrainings.map((prevTraining) =>
                prevTraining._id === training._id ? { ...prevTraining, enrolled: true } : prevTraining
              )
            );
          } else {
            // Inscrever
            api.post('/api/trainings/enroll', { cod: training.cod }, {
              headers: { 'Content-Type': 'application/json' }
            })
              .then((res) => {
                if (res.status === 204) {
                  // Atualizar estado do treinamento para inscrito
                  setTrainings((prevTrainings) =>
                    prevTrainings.map((prevTraining) =>
                      prevTraining._id === training._id ? { ...prevTraining, enrolled: true } : prevTraining
                    )
                  );
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const enrolledTrainings = async (data: { cod: string }): Promise<boolean> => {
    return api.get('/api/trainings/is-enrolled', { params: { cod: data.cod } })
      .then(res => res.data)
      .then(data => {
        console.log('enrolledTrainings ~ data:', data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };


  return (
    <>
      <Typography variant="h4" component="h4">Treinamentos</Typography>
      <Grid container spacing={2} my={2}>
        {trainings.map((training) => (
          <Grid item xs={12} sm={6} md={4} key={training._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h5" gutterBottom>{training.name}</Typography>
                <Typography variant="body1" component="p" color="text.secondary" gutterBottom>{training.desc}</Typography>

                <Typography variant="body1" component="p" gutterBottom>Duração: {training.workload} horas</Typography>

                <Typography variant="body1" component="p" >Período de inscrições:</Typography>
                <Typography variant="body2" component="p" gutterBottom color="text.secondary">
                  {formatDate(training.enroll_start)} - {formatDate(training.enroll_end)}
                </Typography>

                <Typography variant="body1" component="p" >Período de Treinamento:</Typography>
                <Typography variant="body2" component="p" gutterBottom color="text.secondary">
                  {formatDate(training.training_start)} - {formatDate(training.training_end)}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => handleEnroll(training)}
                  sx={{ my: 1 }}
                  disabled={training.enrolled}
                  color={training.enrolled ? 'warning' : 'primary'}
                >
                  {training.enrolled ? 'Inscrito' : 'Inscrever-se'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
