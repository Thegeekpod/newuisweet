

import { BlogList } from '@/component/admin/pages/Blog/BlogList';
import prisma from '../../../../../lib/prisma';

const AdminBlogTable = async () => {

const data = await prisma.blogs.findMany({
  orderBy: {
    id: 'desc',
  },

})
  return (
    <BlogList faker={data}/>
  );
};

export default AdminBlogTable;


