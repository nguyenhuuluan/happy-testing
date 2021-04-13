import Index from '../pages';
import CreateCourse from '../pages/training-management/create';
import EditCourse from '../pages/training-management/edit';
import TrainingResult from '../pages/training-management/result';

const routes = [
  {
    path: '/',
    name: 'Login',
    main: () => <Index />
  },
  {
    path: '/training-management',
    name: 'Training Management',
    main: () => <TrainingResult />
  },
  {
    path: '/training-management/create',
    name: 'Create',
    main: () => <CreateCourse />
  },
  {
    path: '/training-management/edit',
    name: 'Edit',
    main: () => <EditCourse />
  }

];

export default routes;