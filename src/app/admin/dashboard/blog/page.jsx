

import { BlogList } from '@/component/admin/pages/Blog/BlogList';
import prisma from '../../../../../lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
const AdminBlogTable = async () => {
noStore();
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


