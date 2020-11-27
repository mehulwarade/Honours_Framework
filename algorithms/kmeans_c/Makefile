MPICC = mpicc
FLG = -O4
NAME = kmeans_c.exe

all: par_kmeans.o kmeans.o cluster.h

	$(MPICC) $(FLG) par_kmeans.o kmeans.o -lm -o $(NAME)

par_kmeans.o: par_kmeans.c kmeans.h

	$(MPICC) $(FLG) par_kmeans.c -c -lm

kmeans.o: kmeans.c kmeans.h cluster.h

	$(MPICC) $(FLG) kmeans.c -c

clean:
	rm -f *.o *.out *.exe
	rm -f *.bin  

